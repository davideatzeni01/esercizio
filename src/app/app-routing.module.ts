import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AllenamentoComponent} from './allenamento/allenamento.component';
import {AttivitaComponent} from './attivita/attivita.component';
import {PazientiComponent} from './pazienti/pazienti.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'pazienti', component: PazientiComponent},
  {path: 'attivita', component: AttivitaComponent},
  {path: 'allenamento', component: AllenamentoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

