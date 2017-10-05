import { Component, Input, OnInit, NgModule} from '@angular/core';
import { Observable }        from 'rxjs/Observable';
//import { MathJax } from 'mathjax'
declare var  MathJax :any;

@Component({
  selector: 'mathjax-display',
  providers: [],
  styleUrls: ['./mathjax-display.css'],
  template: `
    <div id="{{mathJaxDivName}}" class="mathJax"></div>
  `
})
export class MathjaxDisplayComponent {
  @Input() mathMLTextObserver: Observable<string>;
  mathJaxDivName: string;
  constructor(){

  }
  /*so as long as i append the data into the html body after it started
  then i'm good*/
  addMathMl(mathMLText){

    /*access a single element*/
    document.getElementById(this.mathJaxDivName).innerHTML = mathMLText;
    var math = document.getElementById("append");

    MathJax.Hub.Queue(["Typeset",MathJax.Hub,math]);
  }


  ngOnInit(){
    this.mathJaxDivName = (Math.random()*1e16).toString(36);
    //window.addEventListener("resize", function(){
    //  console.log("testing")
    //});
    this.mathMLTextObserver.subscribe(function(text){
      //console.log("getting MathML")
      //console.log(text)
      this.addMathMl(text);

    }.bind(this));

  }
}
