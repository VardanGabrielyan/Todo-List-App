import React from "react";
import Todo from "./Todo.js"
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import uuid from 'uuid';
//import reducer from '../reducers/index'
//import store from '../store/index'


const del=46;
const space=32;
const enter=13;
const backspace=8;
const selectedText = window.getSelection().toString();

 class Content extends React.Component  {
    constructor(props){
        super(props)
        const goodId = uuid();
        this.state = { 
            good:  [{  id: goodId , value:''}],
            bad:   [{  id: uuid(), value:''}],
            GoodIsSelectedInput: goodId,
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
        const currentIndex = this.state[type].findIndex(item => item.id === event.target.id);
        const value = event.target.value;   
        const todo = [...this.state[type]]
        console.log(value.length,'-------value',currentIndex)
            if (event.keyCode === backspace || event.keyCode === del || event.keyCode === space){
                if (value.trim().length === 0 || (selectedText && selectedText.trim().length === value.trim().length)) {
                    todo.splice(currentIndex,1)
                    this.setState({[type]: todo})
                    //this.setState({[type]: this.state[type].slice(0, this.state[type].length - 1)})
                        
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
            BadIsSelectedInput: null,
        })
    }
        if(type==='bad'){
            this.setState({
                BadIsSelectedInput: event.target.id,
                GoodIsSelectedInput: null,
            })
        }
    }
    moveTodo = type => (dragId, dropId) => {
        let newGoodArray = null;
        let newBadArray = null;
        // if(dragId===dropId){
        //     return
        // }
        if (type === 'good') {
            const dragObject = this.state.bad.find(item => item.id === dragId);
            const dropObject = this.state.good.find(item => item.id === dropId);
            if(!dragObject){
                return
            }
            if (dragObject.value.length) {
                
                console.log(dragObject,'----------dragobject')
                
                if  (!dropObject.value.length) {
                    newGoodArray = [...this.state.good];
                    newGoodArray.splice(this.state.good.length - 1, 0, dragObject)
                    newBadArray = this.state.bad.filter(badItem => badItem.id !== dragId)
                } else {
                    newGoodArray = this.state.good.map(item => item.id === dropId ? dragObject: item)
                    newBadArray = this.state.bad.map(item => item.id === dragId ? dropObject: item)
                } 
                this.setState({
                    good: newGoodArray,
                    bad: newBadArray,
                })
            } else if (!dragObject.value.length) {
                if (dropObject.value.length) {
                    newBadArray = [...this.state.bad];
                    newBadArray.splice(this.state.bad.length - 1, 0, dropObject);

                    this.setState({
                        good: this.state.good.filter(goodItem => goodItem.id !== dropId),
                        bad: newBadArray,
                    });
                }
            }
        }
            if(type === 'bad'){
                const dragObject = this.state.good.find(item => item.id === dragId);
                const dropObject = this.state.bad.find(item => item.id === dropId);
                if(!dragObject){
                    return
                }
                if (dragObject.value.length) {
                    if  (!dropObject.value.length) {
                        newBadArray = [...this.state.bad];
                        newBadArray.splice(this.state.bad.length - 1, 0, dragObject)
                        newGoodArray = this.state.good.filter(badItem => badItem.id !== dragId)
                    } else {
                        newBadArray = this.state.bad.map(item => item.id === dropId ? dragObject: item)
                        newGoodArray = this.state.good.map(item => item.id === dragId ? dropObject: item)
                    }
    
                    this.setState({
                        good: newGoodArray,
                        bad: newBadArray,
                    })
                } else if (!dragObject.value.length) {
                    if (dropObject.value.length) {
                        newGoodArray = [...this.state.good];
                        newGoodArray.splice(this.state.good.length - 1, 0, dropObject);
    
                        this.setState({
                            bad: this.state.bad.filter(goodItem => goodItem.id !== dropId),
                            good: newGoodArray,
                        });
                    }
                }


//                 const newBadArray = !dropObject.value.length 
//                 ? [...this.state.bad.map(item =>
//                     item.id === dropId ? dragObject: item),
//                     {
//                         id: uuid(),
//                         value: '',
//                     }
//                 ] 
//                 : this.state.bad.map(item => item.id === dropId ? dragObject: item)

//                     this.setState({
//                         bad:    newBadArray,
//                         good: this.state.good.reduce((acc, item) => {
//                             if (item.id === dragId ) {
//                                 dropObject.value.length && acc.push(dropObject)
//                             } else {
//                                 acc.push(item)
//                             }
//                             return acc
//                         }, []),
//                     }
// )
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

        console.log(this.state.good,'-------------good')
        console.log(this.state.bad,'--------------bad')
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
