import React from "react";
import TableInput from "./tableInput";
import Content from "./index.js"
import { DragSource } from 'react-dnd';
import { DropTarget } from 'react-dnd';
import './styles.css'

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
            getSelectedTextCut,
                } = this.props;
        
                return(
                        
                    <td 
                        valign="top">
                        <div>
                            {this.props.data.map((val, index) => (
                                <TableInput
                                    // draggable="true"
                                    // onDragStart={this.dragStart}
                                    // onDragOver={this.dragOver}
                                    // onDragEnd={this.dragEnd}
                                    id={index}
                                    key={index}
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