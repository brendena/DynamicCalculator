import { Injectable } from '@angular/core';
import { Http, Response }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ListEquations } from '../static_classes/ListEquations'
import { Equation } from '../static_classes/Equation'
import { Variable } from '../static_classes/Variable'
import { Range } from '../static_classes/Range'

import 'rxjs/add/operator/map';
import { List } from 'immutable';
@Injectable()
export class EquationAcquireService {

  equationsList:ListEquations;


  constructor(private _http: Http) {


  }

  getEquation(title:string): Promise<Equation> {
    return new Promise((resolve,reject) => {
      if(this.equationsList == undefined){
        this.getEquationGroup().then((equations)=>{
          this.equationsList = equations;
          resolve(this.equationsList.getEquation(title));
        });
      }
      else{
         resolve(this.equationsList.getEquation(title));
      }
    });
  }


  /*
  great tutorial on observiables
  http://jasonwatmore.com/post/2016/12/01/angular-2-communicating-between-components-with-observable-subject
  */

  getEquationGroup(): Promise<ListEquations>{
    return  this._http
               .get("assets/equations.json")
               .map(function(response: Response){
                 var responseJson = response.json();
                 /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                 /
                 /  Currently AllEquation is just a
                 /  normal array.
                 /
                 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
                 var AllEquations = responseJson.equations.map(function(equation){
                    const allVariables = equation.variables.map(function(variable){
                     variable.range = new Range(variable.range);
                     return new Variable(variable);
                   })
                   equation.variables = List(allVariables);
                   return equation
                 });
                 const finalGroupEquation = new ListEquations({"equations":List(AllEquations) });


                 return  finalGroupEquation as ListEquations}).toPromise();

  }



}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
