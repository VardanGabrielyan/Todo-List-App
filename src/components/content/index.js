import React from "react";
import TableInput from "./tableInput";
import Todo from "./Todo.js"
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { log } from "util";
import uuid from 'uuid';


export class Content extends React.Component  {
    
    
    constructor(props){
        super(props)

        this.state = {
            good: [{id: uuid()}],
            bad: [{id: uuid()}],
            GoodIsSelectedInput: 1,
            BadIsSelectedInput: null,
        };
    }
    
    findTodo = (id) => {
        const goodTodos  = this.state.good
        const badTodos = this.state.bad
        const goodTodo = goodTodos.filter((g={})=> g.id ===id)[0]
        const badTodo = badTodos.filter((b={})=> b.id ===id)[0]
        if(goodTodos){
            return {
                goodTodo,
                index: goodTodos.indexOf(goodTodo),
            }
        }
        if(badTodos){
            return{
                badTodo,
                index: badTodos.indexOf(badTodo),
            }
        }
		

    }
    moveTodo = (id, atIndex) => {
		const {goodTodo,badTodo,index} = this.findTodo(id)
    let newGoodTodo = this.state.good
    let newBadTodo = this.state.bad
    newGoodTodo.splice(index, 1); // removing what you are dragging.
    newGoodTodo.splice(atIndex, 0, goodTodo); // inserting it into hoverIndex.
    newBadTodo.splice(index,1);
    newBadTodo.splice(atIndex, 0, badTodo);    
    this.setState({
                good: newBadTodo,
                bad: newGoodTodo,
    })
	}



    //  findTodo = type => id => {
    //     switch (type) {
    //         case 'good':
    //             const GoodTodo = this.state.good.filter(g => g.id === id)[0]
    //             return {
    //                 GoodTodo,
    //                 goodIndex: this.state.good.indexOf(GoodTodo)
    //             }
    //             break;
    //         case 'bad':
    //             const BadTodo = this.state.bad.filter(b => b.id === id)[0]
    //             return {
    //                 BadTodo,
    //                 badIndex: this.state.bad.indexOf(BadTodo)
    //         }
    //             break;
    //         default:
    //             break;
    //     }
    // }
    //  moveTodo = type => (id,indexOf) => {
    //      const {GoodTodo, BadTodo, goodIndex, badIndex} = this.findTodo(id)
    //     switch (type) {
    //         case 'good':
    //                 const newGoodTodos = this.state.good
    //                 newGoodTodos.splice(goodIndex, 1); 
    //                 newGoodTodos.splice(indexOf, 0, GoodTodo); 
    //                     this.setState({
    //                             good: newGoodTodos
    //                 })
    //             break;
    //         case 'bad':
    //                 const newBadTodos = this.state.bad
    //                 newBadTodos.splice(badIndex, 1); 
    //                 newBadTodos.splice(indexOf, 0, BadTodo); 
    //                     this.setState({
    //                             bad: newBadTodos
    //                 })
    //             break;
    //         default:
    //             break;
    //     }
    // }
    getSelectedTextCut = type => event =>{
        const selectedText = window.getSelection().toString();
        event.oncut = () =>{return false} 
        const cut = event.oncut;

            if(cut && selectedText && selectedText.length === event.target.value.length)  {
                switch (type) {
                    case 'good':
                        this.setState({
                            good: this.state.good.slice(0, this.state.good.length - 1)
                            })
                        break;
                    case 'bad':
                        this.setState({
                            bad: this.state.bad.slice(0, this.state.bad.length - 1,selectedText.length)
                            });
                        break;
                    default:
                        break;
                        }
                  } 
               }
    onKeyDownHandler = type => event => {
          const keyboardSmallestLetterCode=48;
          const keyboardLargestLetterCode=90;
          const enter=13;
          const backspace=8;
          const space=32;
          const del=46;
          const input = event.target.value;
          const selectedText = window.getSelection().toString();
        if (!input.trim().length 
            && event.keyCode 
            >= keyboardSmallestLetterCode 
            && event.keyCode 
            <= keyboardLargestLetterCode 
            && !event.ctrlKey) {
            this.addLabel(type)
        } 
        if (event.keyCode === enter && input.length) {    
            switch (type) {
                case 'good':
                    this.setState({
                        GoodIsSelectedInput: this.state.good[this.state.good.length-1].id,
                        BadIsSelectedInput: null,
                    })
                    break;
                case 'bad':
                    this.setState({
                        BadIsSelectedInput: this.state.bad[this.state.bad.length-1].id,
                        GoodIsSelectedInput: null,
            });
                    break;
                default:
                    break;
            }
        }
        if (event.keyCode === backspace || event.keyCode === space || event.keyCode === del) {
            
            if (
              input.trim().length === 1 && event.keyCode !== del
                || (selectedText && selectedText.length === input.length)  
            ){
                switch (type) {
                    case 'good':
                    this.setState({
                        good: this.state.good.slice(0, this.state.good.length - 1)
                    });
                        break;
                    case 'bad':
                    this.setState({
                        bad: this.state.bad.slice(0, this.state.bad.length - 1)
                    });
                        break;
                    default:
                        break;
                }
            }
        } 
    }
    onClickHandler = type => event => {  
        switch (type) {
            case 'good':  
                this.setState({
                    GoodIsSelectedInput: event.target.id,
                    BadIsSelectedInput: null,
                });
                break;
            case 'bad':
                this.setState({
                    BadIsSelectedInput: event.target.id,
                    GoodIsSelectedInput: null,
                });
                break;
            default:
                break;
        }
    }
    addLabel = type => {  
        const newtodo = {
            id: uuid.v4()
        }
        const newtodoBad = {
            id: uuid.v4()
        }
        switch (type) {
            case 'good':
                this.setState({
                        good: [
                            ...this.state.good, 
                            newtodo
                        ]
                });
                break;
            case 'bad':
                this.setState({
                        bad: [
                            ...this.state.bad, 
                            newtodoBad
                        ]
        });
                break;
            default:
                break;
        }
    }
    render(){
        console.log('good-----',this.state.good)
        console.log('bad------',this.state.bad)

        const {connectDropTarget} = this.props
        const goodTodos=this.state.good
        const badTodos=this.state.bad
        // const goodDrag=goodTodos.map((todo) => 
        //        <Todo 
        //             key={this.state.good.id}
        //             id={todo.id}
        //             moveTodo={this.moveTodo}
        //             findTodo={this.findTodo}
        //             data={this.state.good}
        //             GoodIsSelectedInput={this.state.GoodIsSelectedInput}
        //             onKeyDownHandler={this.onKeyDownHandler('good')}
        //             onClickHandler={this.onClickHandler('good')}
        //             getSelectedTextCut={this.getSelectedTextCut('good')}
        //         />
        // )
        // const badDrag=badTodos.map(todo =>
        //       <Todo 
        //                     //key={this.state.good.id}
        //             id={todo.id}
        //             moveTodo={this.moveTodo}
        //             findTodo={this.findTodo}
        //             data={this.state.bad}
        //             BadIsSelectedInput={this.state.BadIsSelectedInput}
        //             onKeyDownHandler={this.onKeyDownHandler('bad')}
        //             onClickHandler={this.onClickHandler('bad')}
        //             getSelectedTextCut={this.getSelectedTextCut('bad')}
        //             />
        // )
            return connectDropTarget(           
                <tr>
                    <td valign="top">
                    <Todo 
                        key={this.state.good.id}
                        moveTodo={this.moveTodo}
                        findTodo={this.findTodo}
                        data={this.state.good}
                        GoodIsSelectedInput={this.state.GoodIsSelectedInput}
                        onKeyDownHandler={this.onKeyDownHandler('good')}
                        onClickHandler={this.onClickHandler('good')}
                        getSelectedTextCut={this.getSelectedTextCut('good')}
                />
                    </td>
                    <td valign="top">
                    <Todo 
                        key={this.state.good.id}
                        moveTodo={this.moveTodo}
                        findTodo={this.findTodo}
                        data={this.state.bad}
                        BadIsSelectedInput={this.state.BadIsSelectedInput}
                        onKeyDownHandler={this.onKeyDownHandler('bad')}
                        onClickHandler={this.onClickHandler('bad')}
                        getSelectedTextCut={this.getSelectedTextCut('bad')}
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
  const ContentTarget = {
	drop() {},
}
const Types = {
    ITEM: 'todo'
}
const DropTargetContent = DropTarget(Types.ITEM, ContentTarget, collectDrop)(Content);
const DragDropContextContainer = DragDropContext(HTML5Backend)(DropTargetContent);
export default DragDropContextContainer;
