import React from "react";
import  "./styles.css"
import {ItemTypes} from './itemTypes';
import TableInput from "./tableInput";
import { PropTypes } from 'prop-types';
import Content from "./index.js"
import { DragDropContextProvider } from 'react-dnd';
import { DragSource } from 'react-dnd';
import { DropTarget } from 'react-dnd';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from "net";
import _ from 'lodash';
import flow from 'lodash/flow'

class GoodTodo extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            GoodIsSelectedInput: 1,
            good: [{id: 1 }]
            
        };
    }


// goodSourceCollect = (connect, monitor) => {
//     return {
//       // Call this function inside render()
//       // to let React DnD handle the drag events:
//          connectDragSource: connect.dragSource(),
//       isDragging: monitor.isDragging(),
//     };
//   }


//  DragDropCard = _.flow(
//   DragSource(Types, goodSource, goodSourceCollect),
//   DropTarget(Types, goodTarget, goodCollect)
// )(TableInput);


// containerCollect = (connect, monitor) => {
//     return {
//       // Call this function inside render()
//       // to let React DnD handle the drag events:
//         connectDropTarget: connect.dropTarget(),
//     };
//   }
  
  containerTarget = {
	drop() {},
}

    _currentId = 1;
        get currentId() {
            return ++this._currentId;    
        }   

        getSelectedTextCut = event =>{
            const selectedText = window.getSelection().toString();
            function func(){
                return false
            }
            event.oncut= function(){ func()}
            const cut = event.oncut;
            if(cut && selectedText && selectedText.length === event.target.value.length)  {
               
                this.setState({
                    good: this.state.good.slice(0, this.state.good.length - 1,selectedText.length)
                })
            } 
        
        }
    
        addLabel = (type) =>  {
            switch (type) {
                case 'good':
                                         
                    this.setState({
                            good: [
                                ...this.state.good, 
                                {
                                    id: this.currentId
                                                                      
                                }
                            ]
                    });
                    break;
                case '':
                
                    break;
                default:
                    break;
            }
        }

    onKeyDownHandler = event => {
        if (!event.target.value.trim().length && event.keyCode >= 48 && event.keyCode <= 90) {
            this.addLabel('good')
            return
        } 
        if (event.keyCode === 13 && event.target.value.length) {    

            this.setState({
                GoodIsSelectedInput: this.state.good[this.state.good.length-1].id
        
            })
            return
        }
        
        if (event.keyCode === 8 || event.keyCode === 32 || event.keyCode === 46) {
            const selectedText = window.getSelection().toString();
            
            if (
                event.target.value.trim().length === 1
                || (selectedText && selectedText.length === event.target.value.length)  
            ){
                this.setState({
                    good: this.state.good.slice(0, this.state.good.length - 1)
                })
            }
        }    
    }
    onClickHandler = (event) => {        
        this.setState({
            GoodIsSelectedInput: event.target.id,
        })
    }
    // findGood(id) {
    //     const goods =this.state.good
    
	// 	const good = goods.filter(c => c.id === id)[0]

	// 	return {
	// 		good,
	// 		index: goods.indexOf(good),
	// 	}
    // }

    // moveGood(id, atIndex) {
	// 	const {good, index} = this.findCard(id)
    
    // let newgoods = this.state.good
    // newgoods.splice(index, 1); // removing what you are dragging.
    // newgoods.splice(atIndex, 0, good); // inserting it into hoverIndex.
    
    render() {
        const { connectDragSource, connectDropTarget, isDragging } = this.props
        return connectDragSource(
            //connectDropTarget(),           
        
                <td className="tableStyle" valign="top">
                <div>
                <goodInput/>
                    {
                        this.state.good.map(val => (
                            <TableInput 
                                style={{opacity: isDragging ? 0.5 : 1,
                                cursor: 'move'}}
                                draggable="true"
                                onDragStart={this.dragStart}
                                onDragOver={this.dragOver}
                                onDragEnd={this.dragEnd}
                                getSelectedTextCut={this.getSelectedTextCut}
                                isGoodSelectedInput={this.state.GoodIsSelectedInput}
                                label={val.label}
                                key={val.id}
                                id={val.id}
                                GoodIsSelectedInput={this.state.GoodIsSelectedInput === val.id}
                                onKeyDownHandler={this.onKeyDownHandler}
                                onClickHandler={this.onClickHandler}
                                //onFocusHandler={this.onFocusHandler}
                                //onCutHandler={this.onCutHandler}
                            />))        
                    }
                     </div>
                </td>

               
             )
        }
    }
    GoodTodo.propTypes= {
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired
    }

    const goodSource ={
        beginDrag(props) {
            return{
                // id: props.id,
                // originalIndex: props.findGood(props.id).index
            }
        },
        endDrag(props, monitor) {
            const{id:droppedId, originalIndex}= monitor.getItem()
            const didDrop = monitor.didDrop()

            if(!didDrop){
                props.moveGood(droppedId, originalIndex)
            }
        }
    }
    
    function goodCollect(connect, monitor) {
        return {
          // Call this function inside render()
          // to let React DnD handle the drag events:
          connectDragSource: connect.dragSource(),
          isDragging: monitor.isDragging()
            //connectDropTarget: connect.dropTarget(),
        }
    }

    const goodTarget = {
        canDrop(){
            return false
        },
        hover(props, monitor){
            const {id: draggedId} = monitor.getItem()
            const {id: overId} = props
            
            if(draggedId !== overId){
                const {index: overIndex} = props.findGood(overId)
                props.moveGood(draggedId, overIndex)
            }
        }
    }

    export default DragSource(ItemTypes.GOOD, goodSource, goodCollect)(GoodTodo)
    



