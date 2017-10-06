import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';

import { Subject }           from 'rxjs/Subject';
import { Variable } from '../static_classes/Variable'
import { Map } from 'immutable';
import 'rxjs'

@Component({
  selector: 'variable-display',
  providers: [],
  template: `
  <md-card class="example-card">
     <md-card-header>

       <md-card-title>{{variable.title}}</md-card-title>
       <md-card-subtitle>{{variable.description}}</md-card-subtitle>

     </md-card-header>
     <md-card-content>
       <md-form-field class="example-full-width">
         <input mdInput type="{{variable.type}}" value="{{variable.defaultValue}}" [ngModel]="userInput" (ngModelChange)="changeUserInputValue($event)">


       </md-form-field>
       <div *ngIf="variable.type != 'Number'">
         <unit-selector [unitType]="'LiquidVolume'" (changedUnit)="changeInputUnit($event)" ></unit-selector>
       </div>
     </md-card-content>
   </md-card>


  `
})
export class VariableDisplayComponent {
  @Input() variable: Variable;
  @Input() userInputSubject: Subject<{"shortHand":string,"value":number, "unit": string}>;
  userInput: number;
  inputUnit: string = "";
  constructor(){

  }
  changeInputUnit(unit){
    console.log(unit)
    this.inputUnit = unit;
    this.changeUserInputValue(this.userInput)
  }
  changeUserInputValue(newValue){

    if(this.variable.type == "Number"){

      this.userInputSubject.next({ "shortHand":String(this.variable.shortHand) ,"value": Number(newValue), "unit": this.variable.type}) //= this.usersInputValues.set(this.variable.title,newValue );
    }
    else{
      if(this.inputUnit != ""){
        this.userInputSubject.next({ "shortHand":String(this.variable.shortHand) ,"value": Number(newValue), "unit": this.inputUnit}) //= this.usersInputValues.set(this.variable.title,newValue );
      }
    }

  }
  ngOnInit(){
    this.userInput = this.variable.defaultValue;
  }
}
