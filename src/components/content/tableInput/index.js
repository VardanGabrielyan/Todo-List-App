import React from "react";
import './styles.css';
import DragDropContextContainer from "../index.js"
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
            //this.inp.focus()        
        };
    }
    componentDidUpdate() {  
        if (this.props.GoodIsSelectedInput) {
            //this.inp.focus()        
        };
        if(this.props.BadIsSelectedInput){
           // this.inp.focus()
        }
    }
    
    inputRef = input => this.inp = input; 
    checkHandler = e => this.setState({isChecked: e.target.checked}); 
    render() {
        console.log(this.props, 'tabelInput');
        
        const { isDragging, 
                connectDragSource, 
                connectDropTarget, 
                } = this.props;
                return connectDragSource(
                    connectDropTarget(
                <div className="line-through">
                    {!isDragging && 
                    <input
                        value={this.props.value}
                        className={this.state.isChecked && "line-through-table-input"}
                        ref={this.inputRef}
                        id={this.props.id}
                        //value={this.props.value}
                        onKeyUp={this.props.onKeyUpHandler}
                        onKeyDown={this.props.onKeyDownHandler}
                        onCut={this.props.getSelectedTextCut}
                        //onClick={this.props.onClickHandler}
                        onChange={this.props.onChangeHandler}
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
         initialIndex: props.id,
      }
    },
    endDrag(props, monitor,component) {
        

        // const {id: droppedId, initialIndex} = monitor.getItem()
        // const dropResult = monitor.getDropResult()
     //  props.moveTodo(droppedId)
    //    if(!monitor.didDrop()){
     //        props.moveTodo()
    //     }
    }
  }
  const dropTarget = {
      drop(props, monitor, component){
          const dragCompId = monitor.getItem().id;
          const dropCompId = props.id;

          props.moveTodo(dragCompId, dropCompId)
          console.log( props.moveTodo(dragCompId, dropCompId),'moveTodo')
          console.log(dropCompId,'sss',dragCompId)
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
    DropTarget(Types.ITEM, dropTarget, collectDrop)
    )(TableInput);
export default DragDrop;