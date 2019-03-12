import React from "react";
import  "./styles.css"
import TableInput from "./tableInput";
import Content from "./index.js"

    class GoodTodo extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            GoodIsSelectedInput: 1,
            good: [{id: 1 }]
            
        };
    }

    _currentId = 1;
        get currentId() {
            return ++this._currentId;    
        }   

        getSelectedTextRemoved = event =>{
            const selectedText = window.getSelection().toString();
            console.log('dddd', )
            if(
                selectedText &&
                selectedText.length === event.target.value.length &&
                event.keyCode===8
            ){
                this.setState({
                    good: this.state.good.slice(0, this.state.good.length - 1)
                })
            }
        }
    
        addLabel = (type) =>  {
            switch (type) {
                case 'good':
                // console.log(this.state.good)
                            
                    this.setState({
                            good: [
                                ...this.state.good, 
                                {
                                    id: this.currentId
                                                                      
                                }
                            ]
                    });
                    break;
                case '':
                    
               
                    
                    break;
                default:
                    break;
            }
        }

    onKeyDownHandler = event => {

        if (!event.target.value.trim().length && event.keyCode >= 48 && event.keyCode <= 90) {
            this.addLabel('good')
            return
        } 
        if (event.keyCode === 13 && event.target.value.length) {    
            console.log('enter' );
            
            this.setState({
                GoodIsSelectedInput: this.state.good[this.state.good.length-1].id
                
            })
            console.log(this.state.GoodIsSelectedInput)
            console.log(this.state.good)
            return
        }

        if (event.keyCode === 8 || event.keyCode === 32 || event.keyCode === 46) {
            const selectedText = window.getSelection().toString();
            
            if (
                event.target.value.trim().length === 1
                || (selectedText && selectedText.length === event.target.value.length)  
            ){
                this.setState({
                    good: this.state.good.slice(0, this.state.good.length - 1)
                })
            }
        }    
    }

    render() {
        return(           
            
                <td className="tableStyle" valign="top">
                    {
                        this.state.good.map(val => (
                            <TableInput 
                                getSelectedTextRemoved={this.getSelectedTextRemoved}
                                isGoodSelectedInput={this.state.GoodIsSelectedInput}
                                label={val.label}
                                key={val.id}
                                id={val.id}
                                GoodIsSelectedInput={this.state.GoodIsSelectedInput === val.id}
                                onKeyDownHandler={this.onKeyDownHandler}
                                //onFocusHandler={this.onFocusHandler}
                                //onCutHandler={this.onCutHandler}
                            />))        
                    }
                </td>
                
            
            )
        }
    }
    export default GoodTodo



