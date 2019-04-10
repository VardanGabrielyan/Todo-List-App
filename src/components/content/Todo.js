import React from "react";
import DragDrop from "./tableInput";
//import "./index.js"
import { DragSource } from 'react-dnd';
import { DropTarget } from 'react-dnd';
import './styles.css'
import { log } from "util";

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
                            {this.props.data.map(val => {
                console.log('val', val);

                                return <DragDrop
                                    id={val && val.id}
                                    onClickHandler={onClickHandler}
                                    onKeyDownHandler={onKeyDownHandler}
                                    BadIsSelectedInput={val && BadIsSelectedInput === val.id}
                                    GoodIsSelectedInput={val && GoodIsSelectedInput === val.id}
                                    getSelectedTextCut={getSelectedTextCut}
                                    findTodo={findTodo}
                                    moveTodo={moveTodo}
                            />})        
                            }
                        </div>
                    </td>
                        )
            }
}
export default Todo;