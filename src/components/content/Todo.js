import React from "react";
import DragDrop from "./tableInput";
//import "./index.js"
import DragDropContextContainer from "./index.js"
import { DragSource } from 'react-dnd';
import { DropTarget } from 'react-dnd';
import './styles.css'

class Todo extends React.Component   {
    render(){
        const { 
            style,
            checked,
            findTodo,
            moveTodo,
            GoodIsSelectedInput,
            BadIsSelectedInput, 
            onClickHandler,
            onKeyDownHandler,
            checkBoxClickHandler,
            getSelectedTextCut,
                } = this.props;
                return(
                    <td 
                        valign="top">
                        <div>
                            {this.props.data.map(val => (
                                <DragDrop
                                    id={val.id}
                                    // key={val.id}
                                    onClickHandler={onClickHandler}
                                    onKeyDownHandler={onKeyDownHandler}
                                    BadIsSelectedInput={BadIsSelectedInput === val.id}
                                    GoodIsSelectedInput={GoodIsSelectedInput === val.id}
                                    getSelectedTextCut={getSelectedTextCut}
                                    findTodo={findTodo}
                                    moveTodo={moveTodo}
                                />))        
                            }
                        </div>
                    </td>
                        )
            }
}
export default Todo;