import { Injectable } from '@angular/core';
import { Http, Response }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { GroupEquations } from '../static_classes/GroupEquations'
import { SectionEquations } from '../static_classes/SectionEquations'

import 'rxjs/add/operator/map';
import { List } from 'immutable';
@Injectable()
export class SectionEquationAcquireService {

  sectionGroup:SectionEquations;
  sectionGroupSubject = new Subject<GroupEquations>();


  constructor(private _http: Http) {
    this.sectionGroupSubject.asObservable().subscribe(function(SectionGroup){
      this.sectionsGroup = SectionGroup;
    }.bind(this));

  }

  getEquationGroupInstance(){
    return this.sectionGroup;
  }

  /*
  great tutorial on observiables
  http://jasonwatmore.com/post/2016/12/01/angular-2-communicating-between-components-with-observable-subject
  */
  setSectionConfig(fileName:string){
    this.getEquationGroup(fileName).subscribe(
      function(item){
        this.sectionGroupSubject.next(item)
      }.bind(this),
      function(error){console.log(error)}
    );
  }

  getEquationGroup(fileName:string):Observable<SectionEquations>{
    return  this._http
               .get("assets/sections/"+ fileName +".json")
               .map(function(response: Response){
                 var responseJson = response.json();

                 var sectionEquations = responseJson.groups.map(function(group){
                    return new GroupEquations(group);
                 });

                 const finalGroupEquation = new SectionEquations({"title": responseJson.title,
                                                                "equations":List(sectionEquations) });


                 return  finalGroupEquation as SectionEquations});

  }

  getSectionEquationObservable():Observable<GroupEquations>{
    return this.sectionGroupSubject.asObservable();
  }

}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
