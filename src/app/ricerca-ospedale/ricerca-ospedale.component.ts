import {Component, OnDestroy, OnInit} from '@angular/core';
import {forkJoin, Subscription} from 'rxjs';
import {AllenamentiService} from '../services/allenamenti.service';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {PazientiModel} from '../interfaces/pazienti.model';
import {AllenamentoModel} from '../interfaces/allenamento.model';
import {PazientiService} from '../services/pazienti.service';
import {AttivitaService} from '../services/attivita.service';
import * as _ from 'lodash';
import {AttivitaModel} from '../interfaces/attivita.model';
import {RandomColorChartService} from '../common/utils/random-color-chart.service';

@Component({
  selector: 'app-ricerca-ospedale',
  templateUrl: './ricerca-ospedale.component.html',
  styleUrls: ['./ricerca-ospedale.component.scss']
})
export class RicercaOspedaleComponent implements OnInit, OnDestroy {
  subscriptions: Array<Subscription> = [];
  pazienti: Array<PazientiModel>;
  bar_options = {
    title: {
      display: true,
      text: 'Intensità allenamento',
    },
    scaleShowVerticalLines: false,
    responsive: true,
  };
  labels: Array<string> = ['None', 'Bassa', 'Moderata', 'Vigorosa'];
  datasets: Array<Array<any>> = [];

  constructor(private allenamentiService: AllenamentiService,
              private pazientiService: PazientiService,
              private attivitaService: AttivitaService,
              private randomColorUtil: RandomColorChartService) {
  }

  ngOnInit() {

    const initData$ = this.pazientiService.getPazienti().pipe(
      tap((pazienti: Array<PazientiModel>) => this.pazienti = pazienti),
      switchMap((pazienti: PazientiModel[]) => forkJoin(pazienti.map(p => this.allenamentiService.getAllenamenti(p.id)))),
      map((result: Array<Array<AllenamentoModel>>) => _.flatten(result)),
      switchMap((allenamenti: Array<AllenamentoModel>) => this.attivitaService.getAttivita().pipe(
        map((attivita: Array<AttivitaModel>) => allenamenti.map(a => ({
          ...a,
          activity: this.getActivity(a.activity),
          intensita: this.getIntensity(attivita.find(el => el.activity === a.activity).intensity),
        }))),
      )),
    );
    this.subscriptions.push(initData$.subscribe());

    const initChart$ = initData$.pipe(
      filter(Boolean),
      map((allenamentiMapped: Array<AllenamentoModel & { intensita: string }>) => _.groupBy(allenamentiMapped, 'id')),
      map((allenamentiGrouped: any) => this.reduceByIntensity(allenamentiGrouped)),
      tap((allenamentiReduced: any[]) => allenamentiReduced.forEach((allenamento: any[]) => {
        const datasetsBySoggetto = [];
        allenamento.forEach(all => {
          const randomColors: any = this.randomColorUtil.getRandomPaletteColor();
          datasetsBySoggetto.push({
            label: [],
            data: all.minutes,
            fill: false,
            backgroundColor: randomColors.backgroundColor,
            borderColor: randomColors.borderColor,
            pointBorderColor: randomColors.pointBorderColor,
            pointBackgroundColor: randomColors.pointBackgroundColor,
          });
        });
        this.datasets.push(datasetsBySoggetto);
      })),
      tap(() => console.log(this.datasets))
    );

    this.subscriptions.push(initChart$.subscribe());
  }

  reduceByIntensity(allenamentiGrouped: any) {
    const keys = Object.keys(allenamentiGrouped);
    const objToArray = keys.map(k => allenamentiGrouped[k]);
    const objToArrayMapped = objToArray.map(a => a.map(el => ({
      minutes: el.minutes,
      intensita: el.intensita,
    })));
    const groupElementByIntensity = objToArrayMapped.map((allenamentiBySoggetto: Array<AllenamentoModel & { intensita: string }>) => _.groupBy(allenamentiBySoggetto, 'intensita'));
    const reducedAllenamentiByIntensity = groupElementByIntensity.map(el => {
      const key = Object.keys(el);
      return key.map(k => el[k].reduce((a, b) => ({minutes: a.minutes + b.minutes, intensita: a.intensita})));
    });
    console.log(reducedAllenamentiByIntensity);
    return reducedAllenamentiByIntensity;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  getActivity(attivita: string) {
    switch (attivita) {
      case 'sleeping': {
        return 'Sonno';
      }
      case 'stationary-awake': {
        return 'Riposo';
      }
      case 'walking': {
        return 'Camminata';
      }
      case 'cycling': {
        return 'Ciclismo';
      }
      case 'swimming': {
        return 'Nuoto';
      }
      case 'running': {
        return 'Corsa';
      }
    }
  }

  getIntensity(intensita: string) {
    switch (intensita) {
      case 'none': {
        return 'None';
      }
      case 'low': {
        return 'Bassa';
      }
      case 'moderate': {
        return 'Moderata';
      }
      case 'vigorous': {
        return 'Vigorosa';
      }
    }
  }
}
