import React from "react";
import  "./styles.css"
import TableInput from "./tableInput";
//import GoodTodo from "./GoodTodo.js"
//import BadTodo from "./BadTodo.js"
import Todo from "./Todo.js"
import injectSheet from 'react-jss'


export class Content extends React.Component  {

    constructor(props){
        super(props)
        this.state = {
            good: [{id: 1,}],
            bad: [{id: 1}],
            GoodIsSelectedInput: 1,
            BadIsSelectedInput: null,
            GoodChecked: false,
            BadChecked: false,
            strike: 'none'
        };
    }

    _currentId = 1;
    get currentId() {
        return ++this._currentId;    
    }  

    onCheckHandler = type => event => {
        switch (type) {
            case 'good':
                    this.setState({
                        GoodChecked: !this.state.GoodChecked,
                        strike: this.state.strike === 'none' ? 'line-through' : 'none'
                    });
                break;
            case 'bad':
                    this.setState({
                        BadChecked: !this.state.BadChecked,
                        strike: this.state.strike === 'none' ? 'line-through' : 'none'
                    });
                break;
            default:
                break;
        }
        
        // if(this.state.GoodChecked){
        //     event.target.value=styles
        //     }
    }

    getSelectedTextCut = event =>{
                  const selectedText = window.getSelection().toString();
                  function func(){
                      return false
                  }
                  event.oncut= function(){ func()}
                  const cut = event.oncut;
                  if(cut && selectedText && selectedText.length === event.target.value.length)  {
                     
                      this.setState({
                          good: this.state.good.slice(0, this.state.good.length - 1,selectedText.length)
                      })
                  } 
              
               }

    onKeyDownHandler = (type) => (event) => {
        
        if (!event.target.value.trim().length && event.keyCode >= 48 && event.keyCode <= 90) {
            this.addLabel(type)
        } 
        if (event.keyCode === 13 && event.target.value.length) {    
            switch (type) {
                case 'good':
                    this.setState({
                        GoodIsSelectedInput: this.state.good[this.state.good.length-1].id,
                        BadIsSelectedInput: null,
                    })
                    break;
                case 'bad':
                    this.setState({
                        BadIsSelectedInput: this.state.bad[this.state.bad.length-1].id,
                        GoodIsSelectedInput: null,
            });
                    break;
                default:
                    break;
            }
        }
        if (event.keyCode === 8 || event.keyCode === 32 || event.keyCode === 46) {
            const selectedText = window.getSelection().toString();
            if (
                event.target.value.trim().length === 1
                || (selectedText && selectedText.length === event.target.value.length)  
            ){
                switch (type) {
                    case 'good':
                    this.setState({
                        good: this.state.good.slice(0, this.state.good.length - 1)
                    });
                        break;
                    case 'bad':
                    this.setState({
                        bad: this.state.bad.slice(0, this.state.bad.length - 1)
                    });
                        break;
                    default:
                        break;
                }
            }
        } 
    }
    checkBoxClickHandler

    onClickHandler = (type) => (event) => {     
        switch (type) {
            case 'good':  
                this.setState({
                    GoodIsSelectedInput: event.target.id,
                    BadIsSelectedInput: null,
                });
                break;
            case 'bad':
                this.setState({
                    BadIsSelectedInput: event.target.id,
                    GoodIsSelectedInput: null,
                });
                break;
            default:
                break;
        }
    }

    addLabel = type => {  
        switch (type) {
            case 'good':
                this.setState({
                        good: [
                            ...this.state.good, 
                            {
                                id: this.currentId                           
                            }
                        ]
                });
                break;
            case 'bad':
                this.setState({
                        bad: [
                            ...this.state.bad, 
                            {
                                id: this.currentId                         
                            }
                        ]
        });
                break;
            default:
                break;
        }
    }

    render(){
            return(           
                <tr>
                    <td valign="top">
                        <Todo 
                            data={this.state.good}
                            GoodIsSelectedInput={this.state.GoodIsSelectedInput}
                            onKeyDownHandler={this.onKeyDownHandler('good')}
                            onClickHandler={this.onClickHandler('good')}
                            onCheckHandler={this.onCheckHandler('good')}
                            checked={this.state.GoodChecked}
                            style={{textDecoration: this.state.strike}}
                            checkBoxClickHandler={this.checkBoxClickHandler}
                        />
                    </td>
                    <td valign="top">    
                        <Todo 
                            data={this.state.bad}
                            BadIsSelectedInput={this.state.BadIsSelectedInput}
                            onKeyDownHandler={this.onKeyDownHandler('bad')}
                            onClickHandler={this.onClickHandler('bad')}
                            onCheckHandler={this.onCheckHandler('bad')}
                            checked={this.state.BadChecked}
                            className={!this.state.BadChecked && 'checkbox'}
                            style={{textDecoration: this.state.strike}}
                            checkBoxClickHandler={this.checkBoxClickHandler}
                        />
                    </td>
                </tr>
                )
    }
}
export default Content;
