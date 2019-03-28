import React, { Component } from 'react';
import Header from "./components/header"
import Content from "./components/content"
import  "./styles/styles.css"
// import { DragSource } from 'react-dnd';
// import { DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'


class App extends Component {
  

//   goodSource = {
//       beginDrag(props){
//           return {};
//       }
//   }

//   collect = (connect, monitor) =>{
//       return{
//           connectDragSource: connect.dragSource(),
//           isDragging: monitor.isDragging()
//       }
//   }

//   goodInput = (connectDragSource, isDragging) => {
//       return connectDragSource(
//           <div style={{
//               opacity: isDragging ? 0.5 : 1,
//               fontSize: 25,
//               fontWeight: 'bold',
//               cursor: 'move'
//           }}>
//           </div>
//       )
//   }

  render() {
    
    return (
      <div className="todo-list" >
             
      <h1> Todo List</h1>

      <table className="tableStyle" >

      < Header/>

      < Content/>

      </table>

      </div>
    );
  }
}

export default DragDropContext (HTML5Backend)(App);
