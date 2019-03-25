import React from "react";
import  "./styles.css"
import TableInput from "./tableInput";
import { PropTypes } from 'prop-types';
import Content from "./index.js"
import { DragSource } from 'react-dnd';
import { DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import { ItemTypes } from "./itemTypes";


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

        getSelectedTextCut = event =>{
            const selectedText = window.getSelection().toString();
            function func(){
                return false
            }
            event.oncut= function(){ func()}
            const cut = event.oncut;
            if(cut && selectedText && selectedText.length === event.target.value.length)  {
               
                this.setState({
                    bad: this.state.bad.slice(0, this.state.bad.length - 1,selectedText.length)
                })
            } 
        
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
        if (event.keyCode === 8 || event.keyCode === 32 || event.keyCode === 46) {
            const selectedText = window.getSelection().toString();
            
            if (
                event.target.value.trim().length === 1
                || (selectedText && selectedText.length === event.target.value.length)  
            ){
                this.setState({
                    bad: this.state.bad.slice(0, this.state.bad.length - 1)
                })
            }
        }    
        
    }

    onClickHandler = (event) => {        
        this.setState({
            BadIsSelectedInput: event.target.id,
        })
    }

    render(){
        
        return(           
            
                <td className="tableStyle" valign="top">
                    {
                        this.state.bad.map(val => (
                            <TableInput
                                type="bad"
                                label={val.label}
                                key={val.id}
                                id={val.id}
                                isBadSelectedInput={this.state.BadIsSelectedInput}
                                getSelectedTextCut={this.getSelectedTextCut}
                                BadIsSelectedInput={this.state.BadIsSelectedInput === val.id}
                                onKeyDownHandler={this.onKeyDownHandler}
                                onClickHandler={this.onClickHandler}
                            />))        
                    }
                </td>
                
            
            )
        }
    }
    BadTodo.propTypes={
        connectDropTarget: PropTypes.func.isRequired
    }

const badTarget = {
    drop(props){
        return ({

        })
    }
}

function badCollect(connect, monitor){
    return{
        connectDropTarget: connect.dropTarget(),
        highlighted: monitor.canDrop()
    }
   
}

    export default DropTarget(ItemTypes.GOOD, badTarget, badCollect)(BadTodo)

