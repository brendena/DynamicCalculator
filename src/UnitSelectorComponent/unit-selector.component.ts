import { Component, Input, OnInit, EventEmitter, Output  }  from '@angular/core';
import 'rxjs'
import { List, Map } from 'immutable';
//import {Convert} from './ConvertUnits';
/*
https://stackoverflow.com/questions/23296094/browserify-how-to-call-function-bundled-in-a-file-generated-through-browserify
So there a convert object avaible globaly
I converted a npm package and with bowerify
*/
declare var  convert :any;

@Component({
  selector: 'unit-selector',
  template: `
  <md-select placeholder="select system" [(ngModel)]="selectedSystem">
    <md-option *ngFor="let system of systems"  [value]="system">
      {{ system }}
    </md-option>
  </md-select>

  <md-select placeholder="select unit" (change)="changedInput($event)">
    <md-option *ngFor="let abbration of abbrations[selectedSystem]" [value]="abbration">
      {{ abbration }}
    </md-option>
  </md-select>
  `
})
export class UnitSelectorComponent {
  @Input() unitType: string;
  @Output() changedUnit: EventEmitter<string> = new EventEmitter();
  systems: string[];
  abbrations: string[];
  selectedSystem: string;
  constructor(){
    //console.log(convertedUnits)
  }
  changedInput(event){
    this.changedUnit.emit(event.value)
  }
  /*
  proper
  */
  ngOnInit(){
    ///*
     /*devide Volume into liquid types and solid types*/
     if(this.unitType == "LiquidVolume" || this.unitType == "NonLiquidVolume"){
       const liquidVolumes = ["ml","cl","dl","l","kl","krm","tsk","msk","kkp","glass","kanna","gal","qt","pnt","cup","fl-oz","Tbs","tsp"];
       const swedishUnites = ["krm","tsk","msk","kkp","glass","kanna"];
       const nonLiquidVolumes = ["mm3","cm3","m3","km3","yd3","ft3","in3"] ;
       this.abbrations = convert().list("volume").reduce((acc,item)=>{
         let key = item.system
         if(swedishUnites.indexOf(item.abbr) != -1)
            key = "Swedish";
         let liquidType = false;
         if(liquidVolumes.indexOf(item.abbr) != -1)
           liquidType = true;
         if( (liquidType == true && this.unitType == "LiquidVolume") ||
             (liquidType == false && this.unitType == "NonLiquidVolume") ){
             acc[key] = acc[key] || []
             acc[key].push(item.abbr);
         }
         return acc
       },{});
     }

     else{
       this.abbrations = convert().list(this.unitType).reduce(function(acc,item){
         const key = item.system
         acc[key] = acc[key] || []
         acc[key].push(item.abbr);
         return acc
       },{});
     }

     this.systems = Object.keys(this.abbrations)
     //this.selectedSystem = this.abbrations[0]
     //*/
  }



}
