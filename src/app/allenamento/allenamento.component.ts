import {Component, OnDestroy, OnInit} from '@angular/core';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {PazientiModel} from '../interfaces/pazienti.model';
import {PazientiService} from '../services/pazienti.service';
import {AllenamentiService} from '../services/allenamenti.service';
import {filter, flatMap, map, switchMap, tap} from 'rxjs/operators';
import {AllenamentoModel} from '../interfaces/allenamento.model';
import {number} from '@amcharts/amcharts4/core';

export interface ChartData {
  data: Array<number>;
  label: string;
}

@Component({
  selector: 'app-allenamento',
  templateUrl: './allenamento.component.html',
  styleUrls: ['./allenamento.component.scss']
})
export class AllenamentoComponent implements OnInit, OnDestroy {

  subscriptions: Array<Subscription> = [];
  pazienti: Array<PazientiModel>;
  attivitaPazienti: Array<Array<AllenamentoModel>> = [];

  constructor(private pazientiService: PazientiService,
              private allenamentiService: AllenamentiService) {
  }

  doughnutChartLabels: Array<Array<string>> = [];
  doughnutChartData: Array<Array<number>> = [];

  ngOnInit() {
    const pazienti$ = this.pazientiService.getPazienti().pipe(
      tap((pazienti: Array<PazientiModel>) => this.pazienti = pazienti),
      switchMap((pazienti: PazientiModel[]) => forkJoin(pazienti.map(p => this.allenamentiService.getAllenamenti(p.id)))),
      tap((result: Array<Array<AllenamentoModel>>) => this.doughnutChartLabels = result.map((res: Array<AllenamentoModel>) => res.map((r: AllenamentoModel) => r.activity))),
      tap((result: Array<Array<AllenamentoModel>>) => this.doughnutChartData = result.map((res: Array<AllenamentoModel>) => res.map((r: AllenamentoModel) => r.minutes))),
    );
    this.subscriptions.push(pazienti$.subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  getDataPosition(index: number) {
    console.log(index, '>>>>>>>>>>>>>< index 1');
    return this.doughnutChartData[index];
  }

  getLabelPosition(index: number) {
    console.log(index, '>>>>>>>>>>>>>< index 2');
    return this.doughnutChartLabels[index];
  }

}
