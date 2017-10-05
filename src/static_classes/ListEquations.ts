import { Equation } from './Equation'
import { List, Map, Record } from 'immutable';

let ListEquationsImmutable = Record({
 equations: List([])

})


export class ListEquations extends ListEquationsImmutable {
  equations:List<Equation>;
  constructor(object){
    super(object);
  }

  getIndexEquation(title:string): number{
    const indexOfEquation = this.equations.findIndex(function(equation){

       return equation.fileName === title;
     }.bind(this) );
     return indexOfEquation;
  }
  getEquationIndex(index:number){
    return this.equations.get(index);
  }
  getEquation(title:string){
    const indexOfEquation = this.getIndexEquation(title);
    if(indexOfEquation == -1){
      return undefined;
    }
    else{
      return this.getEquationIndex(indexOfEquation);
    }
  }


}
