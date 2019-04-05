import React, { Component } from 'react';
import Header from "./components/header"
import DragDropContextContainer from "./components/content"


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
      <div >      
        <h1> Todo List</h1>
        <table className="tableStyle">
          <Header />
          <DragDropContextContainer />
        </table>
      </div>
    );
  }
}

export default App;
