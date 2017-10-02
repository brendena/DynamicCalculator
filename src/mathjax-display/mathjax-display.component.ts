import { Component, Input, OnInit, NgModule } from '@angular/core';
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

  constructor(){


  }
  addMathMl(){
    /*access a single element*/
    document.getElementById("append").innerHTML = `
    <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
         <semantics>
          <mrow>
           <mn>3</mn>
           <mo stretchy="false">/</mo>
           <mn>3</mn>
           <mo stretchy="false">⋅</mo>
           <mn>33</mn>
          </mrow>
          <annotation encoding="StarMath 5.0">3 / 3 cdot 33 </annotation>
         </semantics>
        </math>`;
    var math = document.getElementById("append");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,math]);

  }
  ngOnInit(){

    /*so as long as i append the data into the html body after it started
    then i'm good*/
    console.log(MathJax)
    console.log("ya")
    this.addMathMl();
  }
}
