import React from "react";
import './styles.css';
import DragDropContextContainer from "../index.js"
import { DragSource } from 'react-dnd';
import { DropTarget } from 'react-dnd';
import _ from 'lodash';
import Todo from "../Todo.js"

 class TableInput extends React.Component {


    constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.inp = React.createRef();
    this.state = {
        isChecked: false
    }
  }
    
    componentDidUpdate() {  
        
      //  if (this.props.GoodIsSelectedInput) {
      //       console.log(this.props.GoodIsSelectedInput,'goodselectedinput')
      //       console.log(this.props.BadIsSelectedInput,'badselectedinput')
      //       console.log(this.inp,'---inp')
      //      this.inp.focus()        
      //  }
      //  if(this.props.BadIsSelectedInput){
      //       console.log(this.props.GoodIsSelectedInput,'goodselectedinput')
      //       console.log(this.props.BadIsSelectedInput,'badselectedinput')
      //       console.log(this.inp,'---inp')
      //      this.inp.focus()
      //  }  
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
                                        <>
                                        <input
                                            value={this.props.value}
                                            autoFocus={this.props.GoodIsSelectedInput}
                                            className={this.state.isChecked && "line-through-table-input"}
                                            ref={this.inputRef}
                                            id={this.props.id}
                                            onKeyUp={this.props.onKeyUpHandler}
                                            onKeyDown={this.props.onKeyDownHandler}
                                            onCut={this.props.getSelectedTextCut}
                                            onChange={this.props.onChangeHandler}
                                            onClick={this.props.onClickHandler}
                                        />
                                        <input 
                                            onClick={this.props.checkBoxClick}
                                            type="checkbox" 
                                            onChange={this.checkHandler} 
                                        />
                                        </>
                                      }
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
        const inp = null; 
      return {
          id: props.id,
      }
    }
  }
  const dropTarget = {
      drop(props, monitor, component){
          const dragCompId = monitor.getItem().id;
          const dropCompId = props.id;
          props.moveTodo(dragCompId, dropCompId)
      },
      
  }
  const collectDrag = (connect, monitor) => {      
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    }
  }
  const collectDrop = (connect) => {
    return {
      connectDropTarget: connect.dropTarget()
    }
  }
const DragDrop = _.flow(
    DragSource(Types.ITEM, itemSource, collectDrag),
    DropTarget(Types.ITEM, dropTarget, collectDrop)
    )(TableInput);
export default DragDrop;