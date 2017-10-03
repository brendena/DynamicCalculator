export class MathMLConvert  {

  returnStack: string[];
  operatorStack: string[];
  finalArray: string[];
  constructor(){
  }
  solve(){
    var convertingStack = []
    var returnValue = NaN;
    const regNumber = new RegExp('^\\d+$');
    const operators = new RegExp('^[/+⋅-]');//check first line of code for these characters
    //console.log("solving postfix")
    let item;
    for(var i = 0; i < this.finalArray.length; i++)
    {
      item = this.finalArray[i];
      //console.log(convertingStack)
      if(regNumber.test(item))
      {
        convertingStack.push(parseInt(item));
      }
      else if(operators.test(item)){
        let secondValue = convertingStack.pop();
        let firstValue = convertingStack.pop();
        let pushValue = 0;
        switch(item){
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
    };
    return returnValue;
  }
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
      case 'mn':
        this.returnStack.push(tagValue);
        break;
    }
  }
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
  weightOperator(operator){
    let returnWeight = 0;
    switch(operator){
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
