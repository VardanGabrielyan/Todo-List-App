import React from "react";
import  "./styles.css"
import TableInput from "./tableInput";
import Content from "./index.js"




    class BadTodo extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            BadIsSelectedInput: 1,
            bad: [{id: 1 }]
            
           
        };
    }

    _currentId = 1;
        get currentId() {
            return ++this._currentId;    
        }   



        addLabel = (type) =>  {
            switch (type) {
                case 'bad':
                // console.log(this.state.good)
                            
                    this.setState({
                            bad: [
                                ...this.state.bad, 
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
            this.addLabel('bad')
            return
        } 
        if (event.keyCode === 13 && event.target.value.length) {    
            console.log('enter' );
            
            this.setState({
                BadIsSelectedInput: this.state.bad[this.state.bad.length-1].id
                
            })
            console.log(this.state.BadIsSelectedInput)
            console.log(this.state.bad)
            return
        }
        if (event.target.value.trim().length === 1 && event.keyCode === 8){
            
            this.setState({
                bad: this.state.bad.slice(0, this.state.bad.length - 1)
            })
        }
        // if(event.target.value.length===0){
            
        //     this.setState({
        //         isSelectedInput: Number(event.target.id)-1
                
        //     })
        // } 
    }





    render(){
        return(           
            
                <td className="tableStyle" valign="top">
                    {
                        this.state.bad.map(val => (
                            <TableInput
                                selectInput={this.selectInput}
                                label={val.label}
                                key={val.id}
                                id={val.id}
                                //handleChange={this.handleChange}
                                BadIsSelectedInput={this.state.BadIsSelectedInput === val.id}
                                onKeyDownHandler={this.onKeyDownHandler}
                                onFocusHandler={this.onFocusHandler}
                                //onCutHandler={this.onCutHandler}
                            />))        
                    }
                </td>
                
            
            )
        }
    }
    export default BadTodo

