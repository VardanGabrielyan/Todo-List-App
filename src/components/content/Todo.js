import React from "react";
import DragDrop from "./tableInput";
import './styles.css'


class Todo extends React.Component   {
    render  (){
        const { 
            type,
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
            onKeyUpHandler,
            shiftArray
            } = this.props;
                return (
                    <td valign="top">
                        <div>
                            {this.props.data.map(val =>{
                                return  <DragDrop
                                            id={val && val.id}
                                            value={val && val.value}
                                            onClickHandler={onClickHandler}
                                            onKeyDownHandler={onKeyDownHandler}
                                            onKeyUpHandler={onKeyUpHandler}
                                            BadIsSelectedInput={val && BadIsSelectedInput === val.id}
                                            GoodIsSelectedInput={val && GoodIsSelectedInput === val.id}
                                            getSelectedTextCut={getSelectedTextCut}
                                            findTodo={findTodo}
                                            moveTodo={moveTodo}
                                            onChangeHandler={onChangeHandler}
                                            shiftArray={shiftArray}
                            /> 
                        })
                    }
                </div>
            </td>
        )
    }                      
}
export default Todo;