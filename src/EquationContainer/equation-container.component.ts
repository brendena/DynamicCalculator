import { Component, Input, OnInit }  from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { Equation }          from '../static_classes/Equation'
import { Variable }          from '../static_classes/Variable'
import { EquationAcquireService } from '../data/equations-acquire.service'
import { ListEquations } from '../static_classes/ListEquations'

import 'rxjs'
import { List, Map } from 'immutable';

@Component({
  selector: 'equation-container',
  template: `
    <div *ngIf="equation" >
      <equation-display [equation]="equation"></equation-display>
    </div>
  `
})
export class EquationContainerComponent {
  @Input() equationName: string;
  equation: Equation;
  listEquations: ListEquations;
  constructor(private equationAcquireService: EquationAcquireService){

  }
  /*
  proper
  */
  ngOnInit(){
    this.equationAcquireService.getEquation(this.equationName).then((Equation)=>{
      this.equation= Equation;
    })
  }



}
