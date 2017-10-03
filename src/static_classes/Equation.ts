import { Variable } from './Variable'
import { List, Map, Record } from 'immutable';

export let EquationImmutable = Record({
 title: 'title',
 fileName: 'fileDestination',
 description: 'description',
 equationString: ' ',
 variables: List([])
})


export class Equation  extends EquationImmutable{
  title: string;
  fileName: string;
  description: string;
  variables: List<Variable>;
  equationString: string; //expression
  constructor(object){
    super(object);
  }
}
