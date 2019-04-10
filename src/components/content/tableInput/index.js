import React from "react";
import './styles.css';
import DragDropContextContainer from "../index.js"
import Todo from "../Todo.js"
import { DragSource } from 'react-dnd';
import { DropTarget } from 'react-dnd';
import _ from 'lodash';

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
        const { isDragging, 
                connectDragSource, 
                connectDropTarget, 
                } = this.props;
                return connectDragSource(
                    connectDropTarget(
                <div className="line-through">
                    {!isDragging && 
                    <input
                        className={this.state.isChecked && "line-through-table-input"}
                        ref={this.inputRef}
                        id={this.props.id}
                        onKeyDown={this.props.onKeyDownHandler}
                        onCut={this.props.getSelectedTextCut}
                        onClick={this.props.onClickHandler}
                    />}
                    <input 
                        onClick={this.props.checkBoxClick}
                        type="checkbox" 
                        onChange={this.checkHandler} 
                    />
                </div>
                    )
                )
            }
}
const Types = {
    ITEM: 'todo'
}
const itemSource = {
    
    beginDrag(props) {
        console.log(props, 'beginDrag');

      return {
          id: props.id,
          initialIndex: props.findTodo(props.id).index,
      }
    },
    endDrag(props, monitor) {
        console.log(props, 'endDrag');
        
       const {id: droppedId, initialIndex} = monitor.getItem()
       const didDrop = monitor.didDrop()
       if(!didDrop){
           props.moveTodo(droppedId, initialIndex)
       }
    }
  }
  const todoTarget = {
      canDrop(){
          return false
      },
      hover(props, monitor) {
		const { id: draggedId } = monitor.getItem()
		const { id: overId } = props
		if (draggedId !== overId) {
			const { index: overIndex } = props.findTodo(overId)
			props.moveTodo(draggedId, overIndex)
		}
	}
  }
  const collectDrag = (connect, monitor) => {      
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
      
    }
  }
  const collectDrop = (connect, monitor) => {

    return {
      connectDropTarget: connect.dropTarget()
    }
  }
const DragDrop = _.flow(
    DragSource(Types.ITEM, itemSource, collectDrag),
    DropTarget(Types.ITEM, todoTarget, collectDrop)
    )(TableInput);
export default DragDrop;