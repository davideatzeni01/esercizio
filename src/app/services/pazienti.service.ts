import {Injectable} from '@angular/core';
import {PazientiModel} from '../interfaces/pazienti.model';
import {Observable, of} from 'rxjs';
import {pazienti} from '../mock-data/pazienti';

@Injectable({
  providedIn: 'root'
})
export class PazientiService {

  constructor() { }

  getPazienti(): Observable<Array<PazientiModel>> {
    return of(pazienti);
  }

}
