import { ParserMathML } from './ParserMathML'
declare var  convert :any;
export class MathMLConvert  {
  finalArray: string[];
  parserMathML: ParserMathML = new ParserMathML();
  constructor(){
  }
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  /  accepts a dictonary of the variable from
  /  equation component
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  solve(variableValues:{"value": number, "unit": string}):number{
    //var variablesKey = Object.keys(variableValues);
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    / remove all the variables with numbers
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    const mappedFinalArray = this.finalArray.map(function(value){
      //not a vraible then just return value
      let returnValue = "";
      var splitValues = value.split(" ");
      if(variableValues[value] == undefined && variableValues[splitValues[0]] == undefined){
        returnValue = value;
      }
      //if it is a variable conver it
      else{

        if(variableValues[splitValues[0]].unit != "Number"){
          /*
          parse the element here
          If the unit is not nothing then try and converting it
          */
          if(variableValues[splitValues[0]].unit != ""){
            returnValue = convert(variableValues[splitValues[0]].value).from(variableValues[splitValues[0]].unit).to(splitValues[1]);
          }
          else{
            returnValue ="NaN";
          }
        }
        else{
          returnValue = variableValues[value].value;
        }
      }
      return returnValue;
    });
    console.log(mappedFinalArray);

    var convertingStack = []
    var returnValue = NaN;
    var broke = false;
    const regNumber = new RegExp('^\\d+$');
    const operators = new RegExp('^[/+∗⋅-]');//check first line of code for these characters
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    / the way to solve a postfix problem
    / is to find 2 values and a operator
    / So numbers are just pushed on the stack
    / and operators grab the last two values
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    let item;
    for(var i = 0; i < mappedFinalArray.length && broke == false; i++)
    {
      item = mappedFinalArray[i];
      //console.log(convertingStack)
      if(typeof(item) == "number" || regNumber.test(item))
      {
        convertingStack.push(parseInt(item));
      }
      else if(operators.test(item)){
        let secondValue = convertingStack.pop();
        let firstValue = convertingStack.pop();
        let pushValue = 0;
        switch(item){
          case "∗":
          case "⋅":
            pushValue = firstValue * secondValue;
            break;
          case "/":
            pushValue = firstValue / secondValue;
            break;
          case "+":
            pushValue = firstValue + secondValue;
            break;
          case "-":
            pushValue = firstValue - secondValue;
            break;
        }
        convertingStack.push(pushValue)
      }
      else {
        broke = true;
      }
    };
    if(broke === false){
      returnValue = convertingStack.pop();
    }
    return returnValue;
  }
  parseMathML(MathML:string){
    this.finalArray = this.parserMathML.parseMathML(MathML)
  }
}
