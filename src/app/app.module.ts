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
import { EquationAcquireService } from '../data/equations-acquire.service'
import { SectionEquationAcquireService } from '../data/section-equation-acquire.service'
import { EquationContainerComponent } from '../EquationContainer/equation-container.component';
import { UnitSelectorComponent } from '../UnitSelectorComponent/unit-selector.component'

import {MdButtonModule, MdCheckboxModule, MatSidenavModule, MatCardModule, MatInputModule, MatToolbarModule, MatSelectModule} from '@angular/material';

import { routes } from './app.router';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    EquationDisplayComponent,
    VariableDisplayComponent,
    AboutPageComponent,
    MathjaxDisplayComponent,
    EquationContainerComponent,
    UnitSelectorComponent
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
    MatToolbarModule,
    MatSelectModule,
    routes
  ],
  providers: [EquationAcquireService,SectionEquationAcquireService],
  bootstrap: [AppComponent]
})
export class AppModule { }
