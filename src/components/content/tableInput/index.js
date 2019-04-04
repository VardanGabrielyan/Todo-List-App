import React from "react";
import './styles.css';
import Content from "../index.js"
import { DragSource } from 'react-dnd';
import { DropTarget } from 'react-dnd';
import { log } from "util";

const Types = {
    ITEM: 'todo'
}
const itemSource = {
    beginDrag(props, monitor, component) {
      return {
          id: props.id,
          initialIndex: findTodo(props.id).index,
      }
    },
    endDrag(props, monitor, component) {
       const {id: droppedId, initialIndex} = monitor.getItem()
       const didDrop = monitor.didDrop()
       if(!didDrop){
           props.moveTodo(droppedId , initialIndex)
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
			const { index: overIndex } = findTodo(overId)
			props.moveCard(draggedId, overIndex)
		}
	}
  }


  function collect1(connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
      
    }
  }
  function collect2(connect, monitor) {
    return {
      connectDropTarget: connect.dropTarget()
    }
  }

 const findTodo = (id) => {
    const { todos } = this.state
    const todo = todos.filter(c => c.id === id)[0]
    return {
        todo,
        index: todos.indexOf(todo),
    }
}

const moveCard = (id, atIndex) => {
    const {card, index} = this.findCard(id)
let newcards = this.state.cards
newcards.splice(index, 1); // removing what you are dragging.
newcards.splice(atIndex, 0, card); // inserting it into hoverIndex.
    this.setState({
            cards: newcards
})
}



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
        const { isDragging, connectDragSource, connectDropTarget, src } = this.props;
        
        return connectDragSource(connectDropTarget(
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
const input = DropTarget(Types.ITEM, todoTarget, collect2)(TableInput);
export default DragSource(Types.ITEM, itemSource, collect1)(input);
