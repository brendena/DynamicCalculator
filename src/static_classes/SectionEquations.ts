import { GroupEquations } from './GroupEquations'
import { List, Map, Record } from 'immutable';

let SectionEquationsImmutable = Record({
 title: 'title',
 equations: List([])

})


export class SectionEquations extends SectionEquationsImmutable {
  title: string;
  equations:List<GroupEquations>;
  constructor(object){
    super(object);
  }
  getIndexEquation(title:string): number{
    const indexOfEquation = this.equations.findIndex(function(equation){

       return equation.title === title;
     }.bind(this) );
     return indexOfEquation;
  }
  getEquation(index:number){
    return this.equations.get(index);
  }
}
