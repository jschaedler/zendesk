import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';

// Components
import { AuthComponent } from './components/auth/auth.component';
import { TicketsComponent } from './components/tickets/tickets.component';

@NgModule({
  declarations: [AppComponent, TicketsComponent, AuthComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'auth', component: AuthComponent, pathMatch: 'full' },
      { path: 'tickets', component: TicketsComponent, pathMatch: 'full' },
      { path: '**', redirectTo: 'tickets' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
