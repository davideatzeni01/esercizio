import {Component, OnInit} from '@angular/core';
import {AttivitaService} from '../services/attivita.service';
import {Observable} from 'rxjs';
import {AttivitaModel} from '../interfaces/attivita.model';

@Component({
  selector: 'app-attivita',
  templateUrl: './attivita.component.html',
  styleUrls: ['./attivita.component.scss']
})
export class AttivitaComponent implements OnInit {
  activity$: Observable<Array<AttivitaModel>>;

  constructor(private attivitaService: AttivitaService) {
  }

  ngOnInit() {
    this.activity$ = this.attivitaService.getAttivita();
  }

  getIcon(attivita: string) {
    switch (attivita) {
      case 'sleeping': {
        return 'hotel';
      }
      case 'stationary-awake': {
        return 'accessibility_new';
      }
      case 'walking': {
        return 'directions_run';
      }
      case 'cycling': {
        return 'directions_bike';
      }
      case 'swimming': {
        return 'pool';
      }
      case 'running': {
        return 'run_circle';
      }
    }
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
