export class ParserMathML{
  returnStack: string[];
  operatorStack: string[];
  constructor(){

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
    console.log(finalArray)
    return finalArray;
  }
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  /  loop through all the nodes and
  /  if they have a name then they need
  /  to move on for further prosesing
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  _parseMathML(nodes){
    nodes.forEach(function(node){
      this._parseNode(node)
    }.bind(this));
  }
  _parseNode(node){
    const tagsName = node.tagName;
    if(tagsName != undefined){
      //console.log(node.tagName)
      //console.log(node)
      if(this.tagDecision(node)){
          this._parseMathML(node.childNodes);
      }


    }
  }
  tagDecision(node){
    const tagName = node.tagName;
    const tagValue = node.innerHTML;
    let dontBreakRecursion = true;
    switch(tagName){
      case 'mmultiscripts':
        dontBreakRecursion = false;
        this.returnStack.push(node.childNodes[1].innerHTML + " " + node.childNodes[7].innerHTML);
        console.log(this.returnStack)
        console.log("going to make this work")
        break;
      case 'mfrac':
        //console.log("this will grab the next two tags and inputs a division sine inbetween")
        dontBreakRecursion = false;
        this._parseNode(node.childNodes[1])
        this.operatorDecision("/")
        this._parseNode(node.childNodes[3])
        break;
      case 'semantics':
      case 'mrow':
        break;
      case 'mo':
        this.operatorDecision(tagValue)
        break;
      case 'mi':
      case 'mn':
        this.returnStack.push(tagValue);
        break;
    }

    return dontBreakRecursion;
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
  operatorDecision(tagValue){
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
