import { Component } from "react";
import Header from "./Header";

import './App.css'


const bygram = ['aa',"as",'ad','af','aj','ak','al','a;','sa','sd','ss','sf','sj','sk','sl','da','ds','dd','df',
'dd','df','dj','dk','dl','d;','fa','fs','fd','ff','fj','fk','fl','f;','ja','js','jd','jf','jj','jk','jl','j;','ka','ks','kd','kf','kk','kl','k;',
'la','ls','ld','lf','lj','lk','ll','l;',';a',';s',';d',';f',';j',';k',';l',';;']

const trygram = ['ads' ,'als' ,'ask' ,'dak' ,'dal' ,'das', 'fad' ,'fas' ,'jak' ,'kaf', 'kas', 'lad' ,'las' ,'sad' ,'sal' ,'ska']

const tetragram = ['daks', "dals" ,'fads', "flak" ,'jaks' ,'kafs' ,'lads', 'laks']

const words = ['flaks' ,'flask' ,'skald']

var initialText = ''
for(let i=0;i<=1;i++){
  initialText = initialText+bygram[Math.floor(Math.random()*bygram.length)]+' '
}


class App extends Component{
  constructor(props){
    super(props)
    this.chras = 0;
    this.state = {combo:3,repitn:2,selected:'bygram',totalChrs:0,errMsg:true,timer:null,text:initialText.repeat(3),inputText:'',startTime:null,endTime:null,words:0,characters:0,accuracy:0,wpm:0,avgWpm:0,sumAvg:0,count:0}
    this.timeObj=null;
  }
  getSentense = (grams,repit)=>{
    
    const {combo} = this.state
    var newText = ''
    for(let i=0;i<combo;i++){
      newText = newText+grams[Math.floor(Math.random()*grams.length)]+' '
    }
    if(repit<=1){
      return newText.repeat(1)
    }
    const text = newText.repeat(repit)
    return text

  }

  selectGrams=(grm)=>{
    switch (grm){
      case 'bygram':
        return bygram
      case 'trygram':
        return trygram
      case 'tetragram':
        return tetragram
      case 'words':
        return words
      default :
      break
    }
  }

  RadioInput = ()=>{
    const {repitn,selected} = this.state
    const grams = this.selectGrams(selected)
    const newText = this.getSentense(grams,repitn)
    this.setState({selected:selected,text:newText})
  }

  getRadions=(event)=>{
    this.setState({selected:event.target.value},this.RadioInput)

  }

  getRepitation=(event)=>{
    const num = parseInt(event.target.value)
    if(num<=1){
      this.setState({repitn:1},this.RadioInput)
    }else{
      this.setState({repitn:event.target.value},this.RadioInput)
    }
  }

  getCombos=(event)=>{
    const {selected} = this.state
    if(event.target.value<1){
      this.setState({combo:1},this.RadioInput)
    }else{
    this.setState({combo:(event.target.value)},this.RadioInput)}
  }

  inputChange=async(event)=>{
    this.chras = this.chras+1
    const {text,inputText,startTime,characters,wpm,count,selected,repitn,combo } = this.state
    const errMsg = text.startsWith(event.target.value)
    console.log(errMsg)
  if(!startTime){
    await this.setState(prev =>({startTime:Date.now(),inputText:event.target.value,
      characters : prev.characters,errMsg,timer:Date.now(),totalChrs:prev.totalChrs}))
    console.log("timer")
  }
  if(text.trim(" ") ===event.target.value ){
    const grams = this.selectGrams(selected)
    const newText = this.getSentense(grams,repitn)
    const acc = Math.round(text.trim().length/(this.chras)*100)
    const min = (Date.now()-startTime)/60000
    const wp = Math.round(inputText.length/5/min)
    this.chras = 0
    console.log(wp)
    await this.setState(prev=>({
      text :newText,
      inputText:'',
      startTime:null,
      endTime:null,
      words:0,
      characters:0,
      accuracy:acc,
      wpm:wp,
      sumAvg:(prev.sumAvg+wp),
      count:prev.count+1,
      errMsg:false,
      totalChrs:prev.totalChrs+1
    }))
  }
  await this.setState(prev=>({
    inputText:event.target.value,
    characters : prev.characters + 1,
    totalChrs:prev.totalChrs+1,
    errMsg
  }))
      
  }
 

  
  
  render(){
    const {repitn,combo,selected,text,inputText,accuracy,wpm,avgWpm,characters,count,sumAvg,errMsg,timer,totalChrs} = this.state
    const avarage = count === 0? 0: Math.round(sumAvg/count)
    console.log(this.chras)
    const time = (Date.now-timer)
    return<div className="app-con">
      <div className="menu-con">
      <div className="menu-selection-con">
          <p>Source</p>
          <div>
            <input type="radio" name="source" value="bygram" id="bygram" checked={selected==="bygram"} onChange={this.getRadions}/>
            <label htmlFor="bygram">bygram</label>
          </div>
          <div>
            <input type="radio" name="source" value='trygram' id='trygram' checked={selected==="trygram"} onChange={this.getRadions}  />
            <label htmlFor="trygram" >trygram</label>
          </div>
          <div>
            <input type="radio" name="source" value="tetragram" id="tetragram" checked={selected==="tetragram"} onChange={this.getRadions}/>
            <label htmlFor="tetragram">tetragram</label>
          </div>
          <div>
            <input type='radio' name="source" value="words" id="words" checked={selected==="words"} onChange={this.getRadions}/>
            <label htmlFor="words">Words</label>
          </div>
      </div>
      <div className="generators">
        <div>
          <p>Generators</p>
          <label htmlFor="combo">Combinations</label>
          <br/>
          <input type="number" value={combo} id='combo' onChange={this.getCombos}/>
        </div>
        <div>
          <label htmlFor="reapit">Reapitaion</label>
          <br/>
          <input type="number" value={repitn} id="reapit" onChange={this.getRepitation}/>
        </div>
      </div>
      </div>
           
            <div className="inp-out-cons">
              <h1 className="sentense bg-primary">{text}</h1>
              <input type="input" value={inputText} placeholder="Enter above sentense" className={`input-bar ${errMsg===false&&"falseEnter"}`} onChange={this.inputChange} />
              <div className="statistics">
                <p className="acc">WPM: {wpm}</p>
                <p className="acc">Accuricy: {accuracy}%</p>
                <p className="acc">Avarage WPM: {avarage}</p>
              </div>
            </div>
          </div>
  }
}

export default App