import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {attivita} from '../mock-data/attivita';
import {AttivitaModel} from '../interfaces/attivita.model';

@Injectable({
  providedIn: 'root'
})
export class AttivitaService {

  constructor() { }

  getAttivita(): Observable<Array<AttivitaModel>> {
    return of(attivita);
  }
}
