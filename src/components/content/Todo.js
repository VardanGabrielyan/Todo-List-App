import React from "react";
import TableInput from "./tableInput";
import Content from "./index.js"
import './styles.css'
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
        
    render(){
        const { 
            style,
            checked,
            GoodIsSelectedInput,
            BadIsSelectedInput,
            onCheckHandler, 
            onClickHandler,
            onKeyDownHandler,
            className,
            checkBoxClickHandler,
            getSelectedTextCut
                } = this.props;
        
                return(
                    <td 
                        valign="top">
                        <div>
                            {this.props.data.map(val => (
                                <TableInput
                                    // draggable="true"
                                    // onDragStart={this.dragStart}
                                    // onDragOver={this.dragOver}
                                    // onDragEnd={this.dragEnd}
                                    onClickHandler={onClickHandler}
                                    onKeyDownHandler={onKeyDownHandler}
                                    BadIsSelectedInput={BadIsSelectedInput === val.id}
                                    GoodIsSelectedInput={GoodIsSelectedInput === val.id}
                                    getSelectedTextCut={getSelectedTextCut}
                                />))        
                            }
                        </div>
                    </td>
                        )
            }
}
export default Todo;