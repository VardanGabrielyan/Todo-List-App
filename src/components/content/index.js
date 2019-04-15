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
            input: [
                    {   id: uuid(), value: '', type: 'good'   },
                    {   id: uuid(), value: '', type: 'bad'  }
                ],
            GoodIsSelectedInput: 1,
            BadIsSelectedInput: null,
        };
    }
   
    onChangeHandler = type => event =>{
        
        let  setInput = this.state.input;

            let obj ={
                id: uuid(),
                value: event.target.value,
                type:type
            }
                  setInput.push(obj);
                    this.setState({
                        input: setInput
                    })
                    if(event.keyCode === enter){
                        this.setState({
                            GoodIsSelectedInput: this.state.input.length--,
                            BadIsSelectedInput: null,
                        })};
                    
                      console.log('sssssssssssss',this.state.GoodIsSelectedInput)
                    
                    // switch (type) {
                    //     case 'good':
                    //     if (event.keyCode === enter){
                            
                    //         break;
                    //     case 'bad':
                    //     if (event.keyCode === enter){
                    //         this.setState({
                    //             BadIsSelectedInput: this.state.bad[this.state.bad.length-1].id,
                    //             GoodIsSelectedInput: null,
                    // })};
                    //         break;
                    //     default:
                    //         break;
                    // }
               

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
        //  if(!event.target.value.trim().length && event.keyCode >= 48 && event.keyCode <= 90){
             
        //     } 
        //         if (event.keyCode === backspace || event.keyCode === space || event.keyCode === del) {
        //             switch (type) {
        //                 case 'good':
        //                         if (
        //                             event.target.value ===1 && event.keyCode !== del
        //                                 || (selectedText && selectedText.length === event.target.value.length)  
        //                             ){
        //                             this.setState({
        //                                 good: this.state.good.slice(0, this.state.good.length - 1)
        //                         })};
        //                     break;
        //                 case 'bad':
        //                         if (this.isEmpty(ItemId)  
        //                         ){
        //                         this.setState({
        //                             bad: this.state.bad.slice(0, this.state.bad.length - 1)
        //                         })};
        //                     break;
        //                 default:
        //                     break;
        //             }
        // }       
    }
    // addLabel = type => {  

    //     const newtodoGood = {
    //         id: uuid.v4(),
    //         value: ''
    //     }
    //     const newtodoBad = {
    //         id: uuid.v4(),
    //         value: ''
    //     }
    //     switch (type) {
    //         case 'good':
    //             this.setState({
    //                     good: [
    //                         ...this.state.good, 
    //                          newtodoGood
    //                     ]
    //             });
    //             break;
    //         case 'bad':
    //             this.setState({
    //                     bad: [
    //                         ...this.state.bad, 
    //                         newtodoBad
    //                     ]
    //     });
    //             break;
    //         default:
    //             break;
    //     }
    // }
    onKeyDownHandler = type => event => {
           
        
    }
    onKeyUpHandler = type => event => {

   
    }
    
    // findTodo = (id) => {
    //     const goodTodos  = this.state.good
    //     const badTodos = this.state.bad
    //     const goodTodo = goodTodos.filter((g={})=> g.id ===id)[0]
    //     const badTodo = badTodos.filter((b)=> {
    //         if(b.id ===id){
    //             return b
    //         }
    //         return null
    //     }
    //     if(goodTodos){
    //         return {
    //             goodTodo,
    //             goodIndex: goodTodos.indexOf(goodTodo),
    //         }
    //     }
    //     if(badTodos){
    //         return{
    //             badTodo,
    //             badIndex: badTodos.indexOf(badTodo),
    //         }
    //     }
    //     return badTodo;
		
    // }
    // }
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
    getSelectedTextCut = type => event =>{
        const selectedText = window.getSelection().toString();
        event.oncut = () =>{return false} 
        const cut = event.oncut;


        if(cut && selectedText && selectedText.length === event.target.value.length){
            this.setState({
                input: this.state.input.slice(0, this.state.input.length - 1)
                })
        }


            if(cut && selectedText && selectedText.length === event.target.value.length)  {
                switch (type) {
                    case 'good':
                        this.setState({
                            good: this.state.good.slice(0, this.state.good.length - 1)
                            })
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
    
    render(){
        console.log(this.state.input, 'asdasda');
       // console.log('good-----',this.state.good)
       // console.log('bad------',this.state.bad)
   
        const {connectDropTarget} = this.props
        const goodTodos=this.state.good
        const badTodos=this.state.bad
        // const goodDrag=goodTodos.map((todo) => 
        //        
        // )
        // const badDrag=badTodos.map(todo =>
        //      
        // )
            return connectDropTarget(           
                <tr>
                    <td valign="top">
                    <Todo 
                        type='good'

                    //    key={this.state.good.id}
                   //     value={this.state.good.value}
                    //    moveTodo={this.moveTodo}
                    //    findTodo={this.findTodo}
                        data={this.state.input}
                        GoodIsSelectedInput={this.state.GoodIsSelectedInput}
                        //onKeyDownHandler={this.onKeyDownHandler('good')}
                        //onKeyUpHandler={this.onKeyUpHandler('good')}
                        //onClickHandler={this.onClickHandler('good')}
                        //getSelectedTextCut={this.getSelectedTextCut('good')}
                        onChangeHandler={this.onChangeHandler('good')}
                />
                    </td>
                    <td valign="top">
                    <Todo 
                        type='bad'
                        //key={this.state.good.id}
                        //value={this.state.bad.value}
                        //moveTodo={this.moveTodo}
                        //findTodo={this.findTodo}
                        data={this.state.input}
                        BadIsSelectedInput={this.state.BadIsSelectedInput}
                        //onKeyDownHandler={this.onKeyDownHandler('bad')}
                        //onKeyUpHandler={this.onKeyUpHandler('bad')}
                        //onClickHandler={this.onClickHandler('bad')}
                        //getSelectedTextCut={this.getSelectedTextCut('bad')}
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
