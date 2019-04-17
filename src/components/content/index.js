import React from "react";
import Todo from "./Todo.js"
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import uuid from 'uuid';

const del=46;
const space=32;
const enter=13;
const backspace=8;
const selectedText = window.getSelection().toString();

export class Content extends React.Component  {
    constructor(props){
        super(props)
        this.state = { 
            good:  [{  id:  uuid(), value: ''}],
            bad:   [{  id: uuid(), value: ''}],
            GoodIsSelectedInput: 0,
            BadIsSelectedInput: null,
        };
    }   
    onChangeHandler = type => event => {
        const value = event.target.value    
        const currentInput = this.state[type].find(input => input.id === event.target.id);
            if (currentInput.value.trim().length === 0) {            
                this.setState({
                    [type]: [
                        ...this.state[type].map(item => currentInput.id === item.id ? {...item, value}: item),
                        {
                            id: uuid(),
                            value: '',
                        }
                    ]
                }) 
            } else {            
                this.setState({ [type]: this.state[type].map(item => currentInput.id === item.id ? { ...item, value } : item) })
            }
    }        
    onKeyDownHandler = type => event => {
        const currentIndex = this.state[type].findIndex(item => item.id === event.target.id);
            if (event.keyCode === enter && event.target.value !== '') {
                switch (type) {
                    case 'good':
                        this.setState({
                            GoodIsSelectedInput: this.state.good[currentIndex + 1].id,
                            BadIsSelectedInput: null,
                        })    
                        break;
                    case 'bad':
                        this.setState({
                            BadIsSelectedInput: this.state.bad[[currentIndex + 1]].id,
                            GoodIsSelectedInput: null,
                    })
                };
            }
        } 
    onKeyUpHandler = type => event => {
        const value = event.target.value;
            if (event.keyCode === backspace || event.keyCode === del || event.keyCode === space){
                if (value.trim().length === 0 || (selectedText && selectedText.trim().length === value.trim().length)) {
                    this.setState({[type]: this.state[type].slice(0, this.state[type].length - 1)})
                    }
                }
            }
    getSelectedTextCut = type => event =>{
        const selectedText = window.getSelection().toString();
        event.oncut = () =>{return false};
            if(event.oncut && selectedText && selectedText.length === event.target.value.length){
                this.setState({[type]: this.state[type].slice(0, this.state[type].length - 1)})
            }
        }


        // swapBoxes = type => (fromTodo, toTodo) => {
        //     let good = this.state.good.slice();
        //     let bad = this.state.bad.slice();
        //     let fromIndex = -1;
        //     let toIndex = -1;
        
        //     for (let i = 0; i < type.length; i++) {
        //     if (types[i].id === fromTodo.id) {
        //     fromIndex = i;
        //     }
        //     if (type[i].id === toTodo.id) {
        //     toIndex = i;
        //     }
        //     }
        //     if (fromIndex !== -1 && toIndex !== -1) {
        //     let { fromId, ...fromRest } = items[fromIndex];
        //     let { toId, ...toRest } = items[toIndex];
        //     items[fromIndex] = { id: fromBox.id, ...toRest };
        //     items[toIndex] = { id: toBox.id, ...fromRest };
        
        //     this.setState({ items: items });
        //     }
        //   };






     //     const newArray = this.state[type].flatMap(item => item.id === event.target.id
    //         ? [{
    //             ...item,
    //             value: event.target.value,
    //           },
    //           {
    //             id: uuid(),
    //             value: '',
    //           }]
    //         : item
    // ) 
    
    //  this.setState({[type]: newArray})
  
    // findTodo = (id) => {
    //     const goodTodos  = this.state.good
    //     const badTodos = this.state.bad
    //     const goodTodo = goodTodos.filter((g={})=> g.id ===id)[0]
        // const badTodo = badTodos.filter((b)=> {
        //     if(b.id ===id){
        //         return b
        //     }
        //     return null}
  //  }
        // if(goodTodos){
        //     return {
        //         goodTodo,
        //         goodIndex: goodTodos.indexOf(goodTodo),
        //     }
        // }
        // if(badTodos){
        //     return{
        //         badTodo,
        //         badIndex: badTodos.indexOf(badTodo),
        //     }
        // }
        // return badTodo;
    findTodo=(id)=>{
        const goodTodos  = this.state.good
        const badTodos = this.state.bad
        const goodTodo = goodTodos.filter((g={})=> g.id ===id)[0]
       
    }
    
   
    moveTodo = (id, atIndex) => {
		const {goodTodo,badTodo,goodIndex,badIndex} = this.findTodo(id)
    let newGoodTodo = this.state.good
    let newBadTodo = this.state.bad
    newGoodTodo.splice(goodIndex, 1); // removing what you are dragging.
    newGoodTodo.splice(atIndex, 0, badTodo); // inserting it into hoverIndex.
    newBadTodo.splice(badIndex,1);
    newBadTodo.splice(atIndex, 0, goodTodo);    
    this.setState({
                good: newBadTodo,
                bad: newGoodTodo,
    })
	}
    
    render (){
        console.log(this.goodTodo,'asasasasas')
        const {connectDropTarget} = this.props
        const goodTodos=this.state.good
        const badTodos=this.state.bad
            
            return connectDropTarget(           
                <tr>
                    <td valign="top">
                    <Todo 
                    //    key={this.state.good.id}
                   //     value={this.state.good.value}
                    //    moveTodo={this.moveTodo}
                    //    findTodo={this.findTodo}
                        data={this.state.good}
                        GoodIsSelectedInput={this.state.GoodIsSelectedInput}
                        onKeyDownHandler={this.onKeyDownHandler('good')}
                        onKeyUpHandler={this.onKeyUpHandler('good')}
                        //onClickHandler={this.onClickHandler('good')}
                        getSelectedTextCut={this.getSelectedTextCut('good')}
                        onChangeHandler={this.onChangeHandler('good')}
                />
                    </td>
                    <td valign="top">
                    <Todo 
                        //key={this.state.good.id}
                        //value={this.state.bad.value}
                        //moveTodo={this.moveTodo}
                        //findTodo={this.findTodo}
                        data={this.state.bad}
                        BadIsSelectedInput={this.state.BadIsSelectedInput}
                        onKeyDownHandler={this.onKeyDownHandler('bad')}
                        onKeyUpHandler={this.onKeyUpHandler('bad')}
                        //onClickHandler={this.onClickHandler('bad')}
                        getSelectedTextCut={this.getSelectedTextCut('bad')}
                        onChangeHandler={this.onChangeHandler('bad')}
                    />
                    </td>
                </tr>
                    )
            }
}
const collectDrop = (connect, monitor) => {
    return {
      connectDropTarget: connect.dropTarget()
    }
  }
const Types = {
    ITEM: 'todo'
}
const DropTargetContent = DropTarget(Types.ITEM, {}, collectDrop)(Content);
const DragDropContextContainer = DragDropContext(HTML5Backend)(DropTargetContent);
export default DragDropContextContainer;
