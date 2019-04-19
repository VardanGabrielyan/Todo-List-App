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

 class Content extends React.Component  {
    constructor(props){
        super(props)
        this.state = { 
            good:  [{  id:  uuid(), value: ''}],
            bad:   [{  id: uuid(), value: ''}],
            GoodIsSelectedInput: 0,
            BadIsSelectedInput: 1,
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
    onClickHandler = type => event => {        
        if(type==='good'){
        this.setState({
            GoodIsSelectedInput: event.target.id,
        })
    }
        if(type==='bad'){
            this.setState({
                BadIsSelectedInput: event.target.id,
            })
        }
    }
    moveTodo = (type) => (dragId, dropId) => {
                console.log('type',type)
               
            if(type==='good'){
                const dropObject = this.state.good.find(item => item.id === dropId)
                const dragObject = this.state.bad.find(item => item.id === dragId)
                //console.log('dropobject',dropObject)
                //console.log('dragobject',dragObject)
                    this.setState({
                        good: this.state.good.map(item => {
                            // if(dropObject.value===0){
                            //     console.log('00000000000',this.state.good)
                            //     return  this.state.good.slice(1)
                                      
                            // }   else
                            return item.id === dropId ? dragObject : item
                        }),
                        bad: this.state.bad.map(item => {
                            return item.id === dragId ? dropObject : item
                        }),
                    })
            }
            if(type==='bad'){
                
                const dropObject = this.state.bad.find(item => item.id === dropId)
                const dragObject = this.state.good.find(item => item.id === dragId)
                console.log('dropobject',dropObject)
                console.log('dragobject',dragObject)
                    this.setState({
                        bad: this.state.bad.map(item => {
                            return item.id === dropId ? dragObject : item
                        }),
                        good: this.state.good.map(item => {
                            return item.id === dragId ? dropObject : item
                        }),
                    })
        }
            }

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
  //  findTodo = type => id => {
        // const goodTodos = this.state.good
        // const badTodos = this.state.bad
        //  if(type === 'good'){
        //     const goodIndex = goodTodos.find((g) => g.id ===id)
        //     console.log(goodIndex, 'fitered good')
        //     return {
        //         goodTodos,
        //         goodIndex//: goodTodos.indexOf(goodTodo),
        //     }
        // } else {
        //     const badIndex= badTodos.find((item) => item.id === id)
        //     console.log(badIndex, 'filtered bad')
        //     return{
        //         badTodos,
        //         badIndex//: badTodos.indexOf(badTodo),
        //     }
        // }
        //const goodTodos  = this.state.good.includes(id)
        //const goodTodo = goodTodos.filter((g={})=> g.id ===id)
        //const badTodo = badTodos.filter((b)=> {
        //    if(b.id ===id){
        //        return b
        //    }
        //    return null})
        // if(goodTodos){
        // }
        // if(badTodos){
        // }
//}
    render (){
        console.log(this.state.good,'good')
        console.log(this.state.bad,'bad')
        const {connectDropTarget} = this.props
            return connectDropTarget(           
                <tr>
                    <td valign="top">
                    <Todo 
                    //    key={this.state.good.id}
                   //     value={this.state.good.value}
                        moveTodo={this.moveTodo('good')}
                        //findTodo={this.findTodo('good')}
                        data={this.state.good}
                        GoodIsSelectedInput={this.state.GoodIsSelectedInput}
                        onKeyDownHandler={this.onKeyDownHandler('good')}
                        onKeyUpHandler={this.onKeyUpHandler('good')}
                        onClickHandler={this.onClickHandler('good')}
                        getSelectedTextCut={this.getSelectedTextCut('good')}
                        onChangeHandler={this.onChangeHandler('good')}
                />
                    </td>
                    <td valign="top">
                    <Todo 
                        //key={this.state.good.id}
                        //value={this.state.bad.value}
                        moveTodo={this.moveTodo('bad')}
                        //findTodo={this.findTodo('bad')}
                        data={this.state.bad}
                        BadIsSelectedInput={this.state.BadIsSelectedInput}
                        onKeyDownHandler={this.onKeyDownHandler('bad')}
                        onKeyUpHandler={this.onKeyUpHandler('bad')}
                        onClickHandler={this.onClickHandler('bad')}
                        getSelectedTextCut={this.getSelectedTextCut('bad')}
                        onChangeHandler={this.onChangeHandler('bad')}
                    />
                    </td>
                </tr>
                    )
            }
}
const collectDrop = (connect) => {
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
