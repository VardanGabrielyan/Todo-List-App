import React from "react";
import DragDrop from "./tableInput";
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
            onChangeHandler,
            value,
            onKeyUpHandler
                } = this.props;

                return (
                    <td 
                        valign="top">
                        <div>
                            {this.props.data.map(val => {
             //  console.log('selectedinput', GoodIsSelectedInput);

                                return <DragDrop
                                    id={val && val.id}
                                    value={value}
                                    onClickHandler={onClickHandler}
                                    onKeyDownHandler={onKeyDownHandler}
                                    onKeyUpHandler={onKeyUpHandler}
                                    BadIsSelectedInput={val && BadIsSelectedInput === val.id}
                                    GoodIsSelectedInput={val && GoodIsSelectedInput === val.id}
                                    getSelectedTextCut={getSelectedTextCut}
                                    findTodo={findTodo}
                                    moveTodo={moveTodo}
                                    onChangeHandler={onChangeHandler}
                            />})        
                            }
                        </div>
                    </td>
                        )
            }
}
export default Todo;