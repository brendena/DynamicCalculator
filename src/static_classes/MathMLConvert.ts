export class MathMLConvert  {

  returnStack: string[];
  operatorStack: string[];
  finalArray: string[];
  constructor(){
  }
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  /  accepts a dictonary of the variable from
  /  equation component
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  solve(variableValues):number{
    //var variablesKey = Object.keys(variableValues);
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    / remove all the variables with numbers
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    const mappedFinalArray = this.finalArray.map(function(value){
      if(variableValues[value] == undefined){
        return value;
      }
      else{
        return variableValues[value];
      }
    });
    //console.log(mappedFinalArray);

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
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  / Parse the text of a mathML file.
  / This part is the user fucntion that
  / grabs the text and parses it and
  / get the first node to allow _parseMathML
  / to convert the MathMl to a postfix notaiton
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  parseMathML(mathMLText){
    this.returnStack = [];
    this.operatorStack = [];
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(mathMLText,"text/xml");
    this._parseMathML(xmlDoc.childNodes)
    const finalArray = this.returnStack.concat(this.operatorStack.reverse())
    //console.log(this.operatorStack)
    //console.log(this.returnStack)
    this.finalArray = finalArray;
    console.log(finalArray);
  }
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  /  loop through all the nodes and
  /  if they have a name then they need
  /  to move on for further prosesing
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  _parseMathML(nodes){
    var tagsName;
    nodes.forEach(function(node){
      tagsName = node.tagName;
      if(tagsName != undefined){
        //console.log(node.tagName)
        //console.log(node)

        this._parseMathML(node.childNodes)
        this.tagDecision(tagsName,node.innerHTML);
      }
    }.bind(this));
  }
  tagDecision(tagName,tagValue){
    switch(tagName){
      case 'semantics':
      case 'mrow':
        break;
      case 'mo':
        this.operatorDecision(tagName,tagValue)
        break;
      case 'mi':
      case 'mn':
        this.returnStack.push(tagValue);
        break;
    }
  }
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  /  Operation are special in postfix.
  /  In postfix if a operation has a higher
  /  weight then it need to be pulled
  /  and replaced with the lower weighted
  /  operation.
  // Example
  // https://www.youtube.com/watch?v=rA0x7b4YiMI
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  operatorDecision(tagName,tagValue){
    var operatorWeight = this.weightOperator(tagValue);
    if(this.operatorStack.length == 0){
      this.operatorStack.push(tagValue);
    }
    else{
      var PreviousOperatorValue = this.operatorStack[this.operatorStack.length - 1];
      var PreviousOperatorWeight = this.weightOperator(PreviousOperatorValue);
      //console.log(PreviousOperatorWeight)
      //console.log(operatorWeight)
      if(PreviousOperatorWeight >= operatorWeight){
        this.returnStack.push(this.operatorStack.pop());
        this.operatorStack.push(tagValue);
      }
      else{
        this.operatorStack.push(tagValue);
      }
    }
  }
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  /  These weights are the exact same
  /  things as order of operation.
  /  Things like multiplication are
  /  more important then + and - signs
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  weightOperator(operator){
    let returnWeight = 0;
    switch(operator){
      case "∗":
      case "⋅":
      case "/":
        returnWeight = 2;
        break;
      case "-":
      case "+":
        returnWeight = 1;
        break;
    }
    return returnWeight;
  }
}
