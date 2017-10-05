import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SectionEquationAcquireService } from '../data/section-equation-acquire.service'


import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { SectionEquations } from '../static_classes/SectionEquations'
import { GroupEquations } from '../static_classes/GroupEquations'


import 'rxjs'



@Component({
  selector: 'main-page',
  template: `

    <div *ngIf="currentGroupEquation" >
      <p>{{currentGroupEquation.title}}</p>
      <equation-container [equationName]="title"  *ngFor="let title of currentGroupEquation.equations">

      </equation-container>
    </div>


  `
})
export class MainPageComponent {

  sectionEquations: SectionEquations;
  currentEquationString: string;
  currentGroupEquation: GroupEquations;
  constructor(private equationAcquireService: SectionEquationAcquireService,private location: Location,private router: Router){
    router.events.subscribe(function(val) {
          this.getCurrentEquation()
      }.bind(this));
  }
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  /  Grab all the components
  /  equations.  Then save them
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  ngOnInit(){

    this.sectionEquations = this.equationAcquireService.getEquationGroupInstance();
    this.getCurrentEquation();

    this.equationAcquireService.getSectionEquationObservable().subscribe(
      function(section){
        this.sectionEquations = section;
        this.getCurrentEquation();
      }.bind(this),
      function(error){console.log(error)}
    );

  }
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  /  Check to see if there are
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  getCurrentEquation(){

    if(this.sectionEquations != undefined){
      const currentLocation = decodeURIComponent(this.location.path().split("/").pop());

      if( this.currentEquationString != currentLocation ){
        this.currentEquationString = currentLocation;

        const indexOfEquation = this.sectionEquations.getIndexEquation(this.currentEquationString);
        console.log(indexOfEquation);
        if(indexOfEquation != -1)
          this.currentGroupEquation = this.sectionEquations.getEquation(indexOfEquation);
      }

    }

  }

}
