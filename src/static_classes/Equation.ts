import { Variable } from './Variable'
import { List, Map, Record } from 'immutable';

export let EquationImmutable = Record({
 title: 'title',
 fileName: 'fileDestination',
 description: 'description',
 equationString: ' ',
 groupVariable: List([]),
 variables: List([])
})
//,"group":List<string> [{"title":string,"group":List<string>}]

export class Equation  extends EquationImmutable{
  title: string;
  fileName: string;
  description: string;
  variables: List<Variable>;
  groupVariable: List<groupVariable>;
  equationString: string; //expression
  constructor(object){
    super(object);
  }
}

export let GroupVariableImmutable = Record({
 title: "string",
 group: List([])
})
//,"group":List<string>

export class groupVariable  extends GroupVariableImmutable{
  title: string;
  group: List<string>;
  constructor(object){
    super(object);
  }
}
