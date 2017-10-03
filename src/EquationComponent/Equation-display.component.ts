import { Component, Input, OnInit }  from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { Equation }          from '../static_classes/Equation'
import { Variable }          from '../static_classes/Variable'
import { MathMLAcqureService } from '../data/mathML-acquire.service'
import { MathMLConvert } from '../static_classes/MathMLConvert';

import 'rxjs'
import { List, Map } from 'immutable';

@Component({
  selector: 'equation-display',
  providers: [MathMLAcqureService],
  templateUrl: './Equation-display.html',
  styleUrls: ['./Equation-display.css'],
})
export class EquationDisplayComponent {
  @Input() equation: Equation;
  userInputSubject = new Subject<{"shortHand":string ,"value":number}>();
  usersInputValues: Map<string,number>;
  mathMLTextObserver: Observable<string>;
  mathMLConvert: MathMLConvert = new MathMLConvert();
  finalValue:number;
  constructor(private mathMLAcqureService: MathMLAcqureService){

  }
  /*
  proper
  */
  ngOnInit(){
    //var map = new Map([["key1", "value1"], ["key2", "value2"]]);

    var test = this.equation.variables.map(function(variable){
      return [variable.shortHand, variable.defaultValue];
    })
    this.usersInputValues = Map(test) as Map<string,number>;

    /*when sombody changes there value the'll send a observable to this point
      with there key and the new value*/
    this.userInputSubject.asObservable().subscribe(function(inputChange){
      this.usersInputValues = this.usersInputValues.set(inputChange.shortHand, inputChange.value);
      const keyForUserInputValues = this.usersInputValues.keySeq().toArray();
      var expression = this.equation.equationString
      keyForUserInputValues.forEach(function(key){
        expression = expression.replace(new RegExp(key, 'g'), this.usersInputValues.get(key))
      }.bind(this));
      this.finalValue = eval(expression);
    }.bind(this));

    var mathMlObserver = this.mathMLAcqureService.getMathMLObserver();
    this.mathMLTextObserver = mathMlObserver;
    mathMlObserver.subscribe(function(mathMLText){
      //do stuff;
      this.mathMLConvert.parseMathML(mathMLText);
      this.mathMLConvert.solve();
    }.bind(this));

    this.mathMLAcqureService.getMLFile(this.equation.fileName)
    //this.mathMLAcqureService.getMLFile();
  }


}
