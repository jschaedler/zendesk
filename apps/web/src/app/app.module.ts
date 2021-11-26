import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

// Components
import { AuthComponent } from './components/auth/auth.component';
import { TicketsComponent } from './components/tickets/tickets.component';

@NgModule({
  declarations: [AppComponent, TicketsComponent, AuthComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'auth', component: AuthComponent, pathMatch: 'full' },
      { path: 'tickets', component: TicketsComponent, pathMatch: 'full' },
      { path: '**', redirectTo: 'tickets' },
    ]),
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
