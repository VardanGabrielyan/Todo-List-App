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

 class TableInput extends React.Component {
    
    inp = null;
    componentDidMount() {  
        //console.log(this.props.GoodIsSelectedInput)
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

    render(){
         
       // const { connectDropTarget } = this.props
        // const{
        //     text,
        //     isDragging,
        //     connectDragSource,
		// 	connectDropTarget
        // } = this.props

        // const opacity = isDragging ? 0 : 1
        console.log(this.props.className)

        return( 
                <div >
                    <input
                        ref={this.inputRef}
                        //key={this.props.key}
                        //value={this.props.value} 
                        //id={this.props.id}
                        onKeyDown={this.props.onKeyDownHandler}
                        onCut={this.props.getSelectedTextCut}
                        onClick={this.props.onClickHandler}
                        //autoFocus={this.props.GoodIsSelectedInput}
                        //onChange={this.props.getSelectedTextRemoved}
                        //onFocus={this.props.onFocusHandler}
                        //{this.props.check}
                        style={this.props.style}
                        className={this.props.className}
                    />
                    <input 
                        onClick={this.props.checkBoxClick}
                        type="checkbox" 
                        onChange={this.props.onCheckHandler} 
                        checked={this.props.checked}
                    />
                </div>
        )
    }
}
export default TableInput ;
