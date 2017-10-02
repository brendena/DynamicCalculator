import { Component, OnInit } from '@angular/core';
import { EquationAcquireService } from '../data/equations-acquire.service'

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { GroupEquations } from '../static_classes/GroupEquations'
import 'rxjs'

@Component({
  selector: 'app-root',
  providers: [EquationAcquireService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  groupEquations: GroupEquations;
  constructor(private equationAcquireService: EquationAcquireService){

  }
  ngOnInit(){
    this.equationAcquireService.getAll().subscribe(
      function(item){
        this.groupEquations = item;
      }.bind(this),
      function(error){console.log(error)}
    );
  }
}
