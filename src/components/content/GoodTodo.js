import React from "react";
import  "./styles.css"
import TableInput from "./tableInput";
import Content from "./index.js"
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from "net";
// import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';




    class GoodTodo extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            GoodIsSelectedInput: 1,
            good: [{id: 1 }]
            
        };
    }

    // const goodSource = {
    //     beginDrag(props){
    //         return {};
    //     }
    // }

    // collect = (connect, monitor) =>{
    //     return{
    //         connectDragSource: connect.dragSource(),
    //         isDragging: monitor.isDragging()
    //     }
    // }
    // goodInput = ({connectDragSource, isDragging}){
    //     return connectDragSource(
    //         <div style={{
    //             opacity: isDragging ? 0.5 : 1,
    //             fontSize: 25,
    //             fontWeight: 'bold',
    //             cursor: 'move'
    //         }}>
    //         </div>
    //     )
    // }

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
                    good: this.state.good.slice(0, this.state.good.length - 1,selectedText.length)
                })
            } 
        
        }
    
        addLabel = (type) =>  {
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
            
            
            this.setState({
                GoodIsSelectedInput: this.state.good[this.state.good.length-1].id
                
            })
            
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
                                getSelectedTextCut={this.getSelectedTextCut}
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



