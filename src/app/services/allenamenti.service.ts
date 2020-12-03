import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AllenamentoModel} from '../interfaces/allenamento.model';
import {allenamento} from '../mock-data/allenamento';

@Injectable({
  providedIn: 'root'
})
export class AllenamentiService {

  constructor() {
  }

  getAllenamenti(id: number): Observable<Array<AllenamentoModel>> {
    return of(allenamento.filter(a => a.id === id));
  }

}
