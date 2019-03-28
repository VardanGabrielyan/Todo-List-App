import React from "react";
import  "./styles.css"
//import TableInput from "./tableInput";
//import GoodTodo from "./GoodTodo.js"
//import BadTodo from "./BadTodo.js"
import Todo from "./Todo.js"

export class Content extends React.Component  {

    constructor(props){
        super(props)
        this.state = {
            good: [{id: 1 }],
            GoodIsSelectedInput: 1,
            GoodChecked: false,
            bad: [{id: 1}],
            BadIsSelectedInput: 1,
            BadChecked: false
        };
    }

    _currentId = 1;
    get currentId() {
    return ++this._currentId;    
}  

    // getSelectedTextCut = event =>{
    //     const selectedText = window.getSelection().toString();
    //     function func(){
    //         return false
    //     }
    //     event.oncut= function(){ func()}
    //     const cut = event.oncut;
    //     if(cut && selectedText && selectedText.length === event.target.value.length)  {
           
    //         this.setState({
    //             good: this.state.good.slice(0, this.state.good.length - 1,selectedText.length)
    //         })
    //     } 
    
    // }

    // onKeyDownHandler = type = event => {
    //     const selectedId = this.state.GoodIsSelectedInput
    //     if (!event.target.value.trim().length && event.keyCode >= 48 && event.keyCode <= 90) {
    //         this.addLabel('good')
    //         return
    //     } 
    //     if (event.keyCode === 13 && event.target.value.length) {    

    //         this.setState({
    //             [GoodIsSelectedInput]: this.state.good[this.state.good.length-1].id
        
    //         })
    //         return
    //     }
        
    //     if (event.keyCode === 8 || event.keyCode === 32 || event.keyCode === 46) {
    //         const selectedText = window.getSelection().toString();
            
    //         if (
    //             event.target.value.trim().length === 1
    //             || (selectedText && selectedText.length === event.target.value.length)  
    //         ){
    //             this.setState({
    //                 good: this.state.good.slice(0, this.state.good.length - 1)
    //             })
    //         }
    //     }    
    // }


    addLabel = type => () => {        
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

    // addTodo=()=>{
    //     if(this.state.good.type==="good"){
    //         return (<GoodTodo/>) 
    //      }  
    //         if(this.state.bad.type==="bad"){
    //             return (<BadTodo/>)
    //      }
    // }

render(){
    
    return(           
        <tr>
            <td valign="top">
                <Todo 
                    addLabel={this.addLabel('good')}
                    //onKeyDownHandler={this.onKeyDownHandler('good')}
                    data={this.state.good}
                    //selectedInput={this.state.GoodIsSelectedInput}
                />
                     
            </td>
     
            <td valign="top">    
                <Todo 
                    addLabel={this.addLabel('bad')}
                    //onKeyDownHandler={this.onKeyDownHandler('bad')}
                    data={this.state.bad}
                    //selectedInput={this.state.BadIsSelectedInput}
                />
            
            </td>
           
        </tr>
        )
    }
}
export default Content