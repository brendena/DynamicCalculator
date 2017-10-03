import { Injectable } from '@angular/core';
import { Http, Response }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class MathMLAcqureService {

  constructor(private _http: Http) {

  }

  mathMLSubject = new Subject<string>();
  /*
  great tutorial on observiables
  http://jasonwatmore.com/post/2016/12/01/angular-2-communicating-between-components-with-observable-subject
  */
  getMathMLObserver():Observable<string>{
    return this.mathMLSubject.asObservable();
  }

  getMLFile(file:string){
    this._observerCallFile(file).subscribe(
      function(item){
        this.mathMLSubject.next(item);
      }.bind(this));
  }
  _observerCallFile(file:string):Observable<string>{
    return this._http
        .get("assets/MathML/"+ file + ".mml")
        .map(function(response: Response){
          //console.log(response["_body"]);
          return response["_body"]})
  }
}
