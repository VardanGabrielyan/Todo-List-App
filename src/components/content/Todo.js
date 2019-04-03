import React from "react";
import  "./styles.css"
import TableInput from "./tableInput";
import Content from "./index.js"
// import {ItemTypes} from './itemTypes';
// import { PropTypes } from 'prop-types';
// import { DragDropContextProvider } from 'react-dnd';
// import { DragSource } from 'react-dnd';
// import { DropTarget } from 'react-dnd';
// import { DragDropContext } from 'react-dnd'
// import HTML5Backend from 'react-dnd-html5-backend';
// import { connect } from "net";
// import _ from 'lodash';
//import flow from 'lodash/flow'

class Todo extends React.Component   {
        
 

    // getSelectedTextCut = type => props =>{
    //     const selectedText = window.getSelection().toString();
    //     function func(){
    //         return false
    //     }
    //     props.oncut= function(){ func()}
        
    //     const cut = props.oncut;
    //     if(cut && selectedText && selectedText.length === props.target.value.length)  {
           
    //         this.setState({
    //             [type]: [this.props[type].slice(0, this.props.type.length - 1,selectedText.length)]
    //         })
    //     } 
    
    // }

    // onKeyDownHandler = type => (event) => {
        
    //     if (!event.target.value.trim().length && event.keyCode >= 48 && event.keyCode <= 90) {
    //         this.props.addLabel(this.props.data)
    //         return
    //     } 
    //     if (event.keyCode === 13 && event.target.value.length) {    
    //         switch (type) {
    //             case 'good':
                                         
    //                 this.setState({
    //                     GoodIsSelectedInput: this.event[this.props.data][this.event[this.props.data].length-1].id
    //                 });
    //                 break;
    //             case 'bad':
    //                 this.setState({
    //                     BadIsSelectedInput: this.event[this.props.data][this.event[this.props.data].length-1].id
    //         });
    //                 break;
    //             default:
    //                 break;
    //         }
            
    //     }
        
    //     if (event.keyCode === 8 || event.keyCode === 32 || event.keyCode === 46) {
    //         const selectedText = window.getSelection().toString();
            
    //         if (
    //             event.target.value.trim().length === 1
    //             || (selectedText && selectedText.length === event.target.value.length)  
    //         ){
    //             this.event.setState({
    //                 [type]: this.event[type].slice(0, this.event[type].length - 1)
    //             })
    //         }
    //     }   } 
    
    // onClickHandler = (event,type) => {        
    //     switch (type) {
    //         case 'good':
                                     
    //             this.setState({
    //                 GoodIsSelectedInput: event.target.id
    //             });
    //             break;
    //         case 'bad':
    //             this.setState({
    //                 BadIsSelectedInput: event.target.id
    //     });
    //             break;
    //         default:
    //             break;
    //     }
    // }

    render(){
        const { style, checked, GoodIsSelectedInput, BadIsSelectedInput, onCheckHandler, onClickHandler, onKeyDownHandler, className, checkBoxClickHandler, getSelectedTextCut } = this.props;
        
            return(
                <td className="tableStyle" valign="top">
                    <div>
                    {   this.props.data.map(val => (
                            <TableInput
                                // style={{opacity: isDragging ? 0.5 : 1,
                                // cursor: 'move'}}
                                // draggable="true"
                                // onDragStart={this.dragStart}
                                // onDragOver={this.dragOver}
                                // onDragEnd={this.dragEnd}
                                id={val.id}
                                key={val.id}
                                style={style}   
                                checked={checked}
                                className={className}
                                onClickHandler={onClickHandler}
                                onCheckHandler={onCheckHandler}
                                onKeyDownHandler={onKeyDownHandler}
                                BadIsSelectedInput={BadIsSelectedInput === val.id}
                                GoodIsSelectedInput={GoodIsSelectedInput === val.id}
                                checkBoxClickHandler={checkBoxClickHandler}
                                //addLabel={this.props.addLabel}
                                getSelectedTextCut={getSelectedTextCut}

                                />))        
                    }
                    </div>
                </td>
            )
    }
}
export default Todo;