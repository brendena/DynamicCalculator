import { Operator } from './operator'
import { List, Map, Record } from 'immutable';
import { Range, RangeImmutable } from './Range'

let VariableImmutable = Record({
 title: 'title',
 description: 'description',
 type: 0,
 defaultValue: 0,
 shortHand: String,
 range: RangeImmutable
})


export class Variable extends VariableImmutable {
  title: string;
  description: string;
  type: number;
  defaultValue: number;
  range: Range;
  shortHand: string;
  constructor(object){
    super(object);
  }
}
//operator: Operator;
//range:{
//  min: number;
//  max: number;
//}
