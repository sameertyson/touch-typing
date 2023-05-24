import { Component } from "react";
import Header from "./Header";

import './App.css'


const twoWordsList = ['aa',"as",'ad','af','aj','ak','al','a;','sa','sd','ss','sf','sj','sk','sl','da','ds','dd','df',
'dd','df','dj','dk','dl','d;','fa','fs','fd','ff','fj','fk','fl','f;','ja','js','jd','jf','jj','jk','jl','j;','ka','ks','kd','kf','kk','kl','k;',
'la','ls','ld','lf','lj','lk','ll','l;',';a',';s',';d',';f',';j',';k',';l',';;']

class App extends Component{

  state ={sentense:'',typeValue:'',isTypeCorrect:true,TypeChrCount:0,acc:0}
  
  componentDidMount(){
    this.getSentense()
  }

  getSentense=async()=>{
    const {sentense,TypeChrCount} = this.state
   
    const accuricy = sentense.length/TypeChrCount * 100
    

    
    let sen_words = ''
    for(let i=0;i<=1;i++){
       let ind =  Math.floor(Math.random()*twoWordsList.length)
       sen_words = sen_words+ twoWordsList[ind] + " "
    }
    if (sentense.length===0){
      await this.setState({sentense:sen_words.repeat(2).trim(' '),typeValue:"",TypeChrCount:0,acc:0})
    }
    else{
      await this.setState({sentense:sen_words.repeat(2).trim(' '),typeValue:"",TypeChrCount:0,acc:Math.floor(accuricy)})
    }
  }

  getTypeValues=async(event)=>{
    await this.setState(prev =>({typeValue:event.target.value,TypeChrCount:prev.TypeChrCount+1}))
    const {typeValue,sentense}=this.state
    if (sentense.startsWith(typeValue)){
      await this.setState({isTypeCorrect:true})
    }else{
      await this.setState({isTypeCorrect:false})
    }
  }
  
  render(){
    const{sentense,typeValue,isTypeCorrect,acc} = this.state
    if(sentense===typeValue){
      this.getSentense()
    }
    return<div className="app-con">
            <Header/>
            <div className="inp-out-cons">
              <h1 className="sentense bg-primary">{sentense}</h1>
              <input type="input" value={typeValue} placeholder="Enter above sentense" className={`input-bar ${isTypeCorrect===false&&"falseEnter"}`} onChange={this.getTypeValues} />
              <div>
                <p className="acc">Accuricy: {acc}%</p>
              </div>
            </div>
          </div>
  }
}

export default App