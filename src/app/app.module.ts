import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import * as moment from 'moment';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {MaterialModule} from './common/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {ChartsModule} from 'ng2-charts';
import { PazientiComponent } from './pazienti/pazienti.component';
import { AttivitaComponent } from './attivita/attivita.component';
import { AllenamentoComponent } from './allenamento/allenamento.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PazientiComponent,
    AttivitaComponent,
    AllenamentoComponent,
  ],
  imports: [
    ChartsModule,
    HttpClientModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
  ],

  providers: [
    {provide: APP_INITIALIZER, useFactory: appGlobalInitializer, multi: true},
    {provide: LOCALE_ID, useValue: 'it-IT'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}

export function appGlobalInitializer() {

  return () => {
    console.log('#### Inizializzazione globale applicazione');
    const spec: moment.LocaleSpecification = <moment.LocaleSpecification>{
      longDateFormat: {
        LLLL: 'DD/MM/YYYY'
      }
    };
    moment.locale('it', spec);

    // TODO: eventuali altre inizializzazioni vanno messe qui....
  };
}


