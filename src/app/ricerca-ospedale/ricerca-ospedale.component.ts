import {Component, OnDestroy, OnInit} from '@angular/core';
import {forkJoin, Subscription} from 'rxjs';
import {AllenamentiService} from '../services/allenamenti.service';
import {map, switchMap, tap} from 'rxjs/operators';
import {PazientiModel} from '../interfaces/pazienti.model';
import {AllenamentoModel} from '../interfaces/allenamento.model';
import {PazientiService} from '../services/pazienti.service';
import {AttivitaService} from '../services/attivita.service';
import * as _ from 'lodash';
import {AttivitaModel} from '../interfaces/attivita.model';

@Component({
  selector: 'app-ricerca-ospedale',
  templateUrl: './ricerca-ospedale.component.html',
  styleUrls: ['./ricerca-ospedale.component.scss']
})
export class RicercaOspedaleComponent implements OnInit, OnDestroy {
  subscriptions: Array<Subscription> = [];
  pazienti: Array<PazientiModel>;

  constructor(private allenamentiService: AllenamentiService,
              private pazientiService: PazientiService,
              private attivitaService: AttivitaService) {
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
      tap(v => console.log(v))
    );
    this.subscriptions.push(initData$.subscribe());

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
