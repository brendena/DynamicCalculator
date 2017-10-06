import { Component, Input, OnInit }  from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { Equation }          from '../static_classes/Equation'
import { Variable }          from '../static_classes/Variable'
import { MathMLAcqureService } from '../data/mathML-acquire.service'
import { MathMLConvert } from '../static_classes/MathMLConvert';
declare var  convert :any;

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
  groupVaraibles:any = {};

  userInputSubject = new Subject<{"shortHand":string ,"value":number, "unit": string}>();
  usersInputValues: Map<string,{"value":number,"unit":number}>;

  mathMLTextObserver: Observable<string>;
  mathMLConvert: MathMLConvert = new MathMLConvert();

  finalValue:number;

  constructor(private mathMLAcqureService: MathMLAcqureService){

  }
  /*
  proper
  */
  ngOnInit(){
    /*
    //So i don't know exactle what the best way of managing the
    //list
    this.equation.variables.filter((item)=>{

      let asdf = this.equation.groupVariable.filter((groupVariable)=>{
        if(groupVariable.group.indexOf(item.shortHand) != -1){
          let key = groupVariable.title
          this.groupVaraibles[key] = this.groupVaraibles[key] || []
          this.groupVaraibles[key].push(item);
          return true;
        }
        return false;
      });
      console.log(asdf)

      if(asdf){
        return false
      }
      return true;
    })
    */


    //var map = new Map([["key1", "value1"], ["key2", "value2"]]);

    var test = this.equation.variables.map(function(variable){
      let units = "Number";
      console.log(variable.type)
      if(variable.type != "Number")
        units = "";
      return [variable.shortHand, {"value":variable.defaultValue, "unit": units} ];
    })
    this.usersInputValues = Map(test) as Map<string,{"value":number,"unit":number}>;

    /*when sombody changes there value the'll send a observable to this point
      with there key and the new value*/
    this.userInputSubject.asObservable().subscribe(function(inputChange){
      this.usersInputValues = this.usersInputValues.set(inputChange.shortHand, {"value":inputChange.value, "unit": inputChange.unit});

      this.finalValue = this.mathMLConvert.solve(this.getValueInputValue())
    }.bind(this));




    /*observer is when mathMl Object get aquired */
    var mathMlObserver = this.mathMLAcqureService.getMathMLObserver();
    this.mathMLTextObserver = mathMlObserver;
    mathMlObserver.subscribe(function(mathMLText){
      //do stuff;
      this.mathMLConvert.parseMathML(mathMLText);
      console.log(this.getValueInputValue())
      this.finalValue = this.mathMLConvert.solve(this.getValueInputValue());
    }.bind(this));

    this.mathMLAcqureService.getMLFile(this.equation.fileName)
  }

  getValueInputValue():any{
    const keyForUserInputValues = this.usersInputValues.keySeq().toArray();
    var dict = []
    keyForUserInputValues.forEach(function(key){
      dict[key] = this.usersInputValues.get(key)
    }.bind(this))
    return dict;
  }


}
/*
const keyForUserInputValues = this.usersInputValues.keySeq().toArray();
var expression = this.equation.equationString
keyForUserInputValues.forEach(function(key){
  expression = expression.replace(new RegExp(key, 'g'), this.usersInputValues.get(key))
}.bind(this));
*/
