import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainPageComponent } from '../mainPage/main-page.component';
import { EquationDisplayComponent } from '../EquationComponent/Equation-display.component';
import { VariableDisplayComponent } from '../VariableComponent/Variable-display.component';
import { AboutPageComponent } from '../about/about.component';
import { MathjaxDisplayComponent } from '../mathjax-display/mathjax-display.component';

import {MdButtonModule, MdCheckboxModule, MatSidenavModule, MatCardModule, MatInputModule} from '@angular/material';

import { routes } from './app.router';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    EquationDisplayComponent,
    VariableDisplayComponent,
    AboutPageComponent,
    MathjaxDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MatSidenavModule,
    MatCardModule,
    MatInputModule,
    routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
