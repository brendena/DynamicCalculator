import { Injectable } from '@angular/core';
import { Http, Response }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { GroupEquations } from '../static_classes/GroupEquations'
import { Equation } from '../static_classes/Equation'
import { Variable } from '../static_classes/Variable'
import { Range } from '../static_classes/Range'

import 'rxjs/add/operator/map';
import { List } from 'immutable';
@Injectable()
export class EquationAcquireService {

  constructor(private _http: Http) {
    console.log("making sure init works")

    this.search().subscribe(
      function(item){
        this.GroupEquationsSubject.next(item)
      }.bind(this),
      function(error){console.log(error)}
    );
  }


  allEquationsGroup:GroupEquations;
  GroupEquationsSubject = new Subject<GroupEquations>();
  /*
  great tutorial on observiables
  http://jasonwatmore.com/post/2016/12/01/angular-2-communicating-between-components-with-observable-subject
  */
  search():Observable<GroupEquations>{

    return  this._http
               .get("assets/calculator.json")
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
                 const finalGroupEquation = new GroupEquations({"title": responseJson.title,
                                                                "equations":List(AllEquations) });


                 return  finalGroupEquation as GroupEquations});

  }

  getAll():Observable<GroupEquations>{
    return this.GroupEquationsSubject.asObservable();
  }
  /*
  getList(){
    return this._http
               .get("assets/calculator.json")
               .map(function(response: Response){
                 var responseJson = response.json();
                 var listOfJson = {
                   "title": responseJson.title
                 }
                 listOfJson.Equations.title = responseJson.equations.map(function(equation){
                   return equation.title;
                 });
                 return listOfJson;
               });
  }
  */
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
