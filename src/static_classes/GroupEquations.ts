import { Equation } from './Equation'
import { List, Map, Record } from 'immutable';

let GroupEquationsImmutable = Record({
 title: 'title',
 equations: List([])

})


export class GroupEquations extends GroupEquationsImmutable {
  title: string;
  equations:List<Equation>;
  constructor(object){
    super(object);
  }
}
