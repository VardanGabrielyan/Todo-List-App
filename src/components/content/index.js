import React from "react";
import  "./styles.css"
import TableInput from "./tableInput";
//import GoodTodo from "./GoodTodo.js"
//import BadTodo from "./BadTodo.js"
import Todo from "./Todo.js"


export class Content extends React.Component  {

    constructor(props){
        super(props)
        this.state = {
            good: [{id: 1 }],
            bad: [{id: 1}],
            GoodIsSelectedInput: 1,
            BadIsSelectedInput: 1
        };
    }

    _currentId = 1;
    get currentId() {
    return ++this._currentId;    
}  
_currentIda = 2;
    get currentIda() {
    return ++this._currentIda;    
}  
 

// selectedInput = (type) => {
//     if(type='good'){
//         return this.state.GoodIsSelectedInput
//     }
//     if(type='bad'){
//         return this.state.BadIsSelectedInput
//     }
// }

onKeyDownHandler = type => (event) => {
        
    if (!event.target.value.trim().length && event.keyCode >= 48 && event.keyCode <= 90) {
        this.addLabel(type)
        console.log(222)
        return
    } 
    if (event.keyCode === 13 && event.target.value.length) {    
        console.log(event.target.value)
        this.setState({
            GoodIsSelectedInput: this.state.good[this.state.good.length-1].id
                            
                         })
                         return
       
        // switch (type) {
        //     case 'good':
                                     
        //         this.setState({
        //             GoodIsSelectedInput: this.state.good[this.state.good.length-1].id
        //         });
        //         return
        //         break;
        //     case 'bad':
        //         this.setState({
        //             BadIsSelectedInput: this.state.bad[this.state.bad.length-1].id
        // });
        // return
        //         break;
        //     default:
        //         break;
        // }
        
    }
    
    if (event.keyCode === 8 || event.keyCode === 32 || event.keyCode === 46) {
        const selectedText = window.getSelection().toString();
        
        if (
            event.target.value.trim().length === 1
            || (selectedText && selectedText.length === event.target.value.length)  
        ){
            this.event.setState({
                [type]: this.event[type].slice(0, this.event[type].length - 1)
            })
        }
    } 
}
    onClickHandler = (event,type) => {        
        switch (type) {
            case 'good':
                                     
                this.setState({
                    GoodIsSelectedInput: event.target.id
                });
                break;
            case 'bad':
                this.setState({
                    BadIsSelectedInput: event.target.id
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
                                id: this.currentIda
                                                          
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
                    //addLabel={this.addLabel('good')}
                    data={this.state.good}
                    //selectedInput={this.state.GoodIsSelectedInput}
                    GoodIsSelectedInput={this.state.GoodIsSelectedInput}
                    onKeyDownHandler={this.onKeyDownHandler('good')}
                    onClickHandler={this.onClickHandler}
                />
                     
            </td>
     
            <td valign="top">    
                <Todo 
                    //addLabel={this.addLabel('bad')}
                    data={this.state.bad}
                    BadIsSelectedInput={this.state.BadIsSelectedInput}
                    onKeyDownHandler={this.onKeyDownHandler('bad')}
                    onClickHandler={this.onClickHandler}
                    //selectedInput={this.state.BadIsSelectedInput}
                />
            
            </td>
           
        </tr>
        )
    }
}
export default Content