import { Component, OnInit } from '@angular/core';
import { SectionEquationAcquireService } from '../data/section-equation-acquire.service'


import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { SectionEquations } from '../static_classes/SectionEquations'
import 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  sectionEquations: SectionEquations;
  constructor(private sectionAcquireService: SectionEquationAcquireService){

  }
  ngOnInit(){

    this.sectionAcquireService.setSectionConfig("mapleSyrupCalculator");
    this.sectionAcquireService.getSectionEquationObservable().subscribe(
      function(item){
        console.log(item)
        this.sectionEquations = item;
      }.bind(this),
      function(error){console.log(error)}
    );

  }
}
