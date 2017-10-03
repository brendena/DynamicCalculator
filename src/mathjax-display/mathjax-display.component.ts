import { Component, Input, OnInit, NgModule } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
//import { MathJax } from 'mathjax'
declare var  MathJax :any;

@Component({
  selector: 'mathjax-display',
  providers: [],
  template: `
    <p>testing mathjax</p>
    <div id="append"></div>
    <button (click)="addMathMl()">add MathMl</button>
  `
})
export class MathjaxDisplayComponent {
  @Input() mathMLTextObserver: Observable<string>;
  constructor(){


  }
  /*so as long as i append the data into the html body after it started
  then i'm good*/
  addMathMl(mathMLText){
    /*access a single element*/
    document.getElementById("append").innerHTML = mathMLText
    var math = document.getElementById("append");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,math]);
  }


  ngOnInit(){
    this.mathMLTextObserver.subscribe(function(text){
      this.addMathMl(text);
    }.bind(this));

  }
}
