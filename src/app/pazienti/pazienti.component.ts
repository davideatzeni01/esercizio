import {Component, OnInit} from '@angular/core';
import {PazientiModel} from '../interfaces/pazienti.model';
import {PazientiService} from '../services/pazienti.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-pazienti',
  templateUrl: './pazienti.component.html',
  styleUrls: ['./pazienti.component.scss']
})
export class PazientiComponent implements OnInit {

  pazienti$: Observable<Array<PazientiModel>>;

  constructor(private pazientiService: PazientiService) {
  }

  ngOnInit() {
    this.pazienti$ = this.pazientiService.getPazienti();
  }

}
