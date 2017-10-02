import { List, Map, Record } from 'immutable';

export let RangeImmutable = Record({
  minimum: 0,
  maximum: 0,
})

export class Range extends RangeImmutable {
  minimum: number;
  maximum: number;
  constructor(object){
    super( object );
  //  super();
  }
}
/*
constructor(min:number, max:number){
  super({minimum:min,maximum:max});
}
*/
