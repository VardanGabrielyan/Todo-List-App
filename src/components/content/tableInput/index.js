import React from "react";
import './styles.css';
// import GoodTodo from "../GoodTodo.js"
// import BadTodo from "../BadTodo.js"
import Content from "../index.js"
// import { DragSource } from 'react-dnd';
// import { DropTarget } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend'
// import { DragDropContext } from 'react-dnd'
import Todo from "../Todo.js"
import { log } from "util";

 class TableInput extends React.Component {
    
    inp = null;
    state={
        isChecked: false,
    }
    componentDidMount() {  
        if (this.props.GoodIsSelectedInput) {
            this.inp.focus()        
        };
    }
    componentDidUpdate() {  
        if (this.props.GoodIsSelectedInput) {
            this.inp.focus()        
        };
        if(this.props.BadIsSelectedInput){
            this.inp.focus()
        }
    }
    inputRef = input => this.inp = input; 
    checkHandler = e => this.setState({isChecked: e.target.checked});
    
    render() {
        return ( 
                <div 
                    className="line-through">
                    <input
                        className={this.state.isChecked && "line-through-table-input"}
                        ref={this.inputRef}
                        id={this.props.id}
                        onKeyDown={this.props.onKeyDownHandler}
                        onCut={this.props.getSelectedTextCut}
                        onClick={this.props.onClickHandler}
                    />
                    <input 
                        onClick={this.props.checkBoxClick}
                        type="checkbox" 
                        onChange={this.checkHandler} 
                    />
                </div>
                )
            }
}
export default TableInput ;
