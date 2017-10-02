import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { EquationAcquireService } from '../data/equations-acquire.service'


import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { GroupEquations } from '../static_classes/GroupEquations'
import { Equation } from '../static_classes/Equation';
import 'rxjs'

@Component({
  selector: 'main-page',
  providers: [EquationAcquireService],
  template: `
    <p>make it work</p>
    <div *ngIf="currentEquation" >
      <equation-display [equation]="currentEquation"></equation-display>
    </div>


  `
})
export class MainPageComponent {

  myGroups: GroupEquations;
  currentEquationString: string;
  currentEquation: Equation;
  test: any;
  constructor(private equationAcquireService: EquationAcquireService,private location: Location,private router: Router){
    router.events.subscribe(function(val) {


          this.getCurrentEquation()

        //book = book.setIn(['storeListings', indexOfListingToUpdate, 'price'], 6.80);
        //this.currentEquation = myGroup.
      }.bind(this));
  }
  ngOnInit(){
    console.log("it worked")
    this.equationAcquireService.getAll().subscribe(
      function(item){
        this.myGroups = item;
        this.test = item.equations;
        this.getCurrentEquation();
      }.bind(this),
      function(error){console.log(error)}
    );
  }
  getCurrentEquation(){


    if(this.myGroups != undefined){
      const currentLocation = decodeURIComponent(this.location.path().split("/").pop());
      if( this.currentEquationString != currentLocation ){
        this.currentEquationString = currentLocation;

        const indexOfCurrentEquation = this.myGroups.get('equations').findIndex(function(equation){

           return equation.title === this.currentEquationString;
         }.bind(this) );

         if(indexOfCurrentEquation != -1)
            this.currentEquation = this.myGroups.equations.get(indexOfCurrentEquation);
      }

    }
  }

}
