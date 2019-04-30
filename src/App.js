import React, { Component } from 'react';
import Header from "./components/header"
import DragDropContextContainer from "./components/content"
import {Provider} from 'react-redux'
//import store from './components/content/store'

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
     // <Provider store={store}>
      <div >      
        <h1> Todo List</h1>
        <table className="tableStyle">
          <Header />
          <DragDropContextContainer />
        </table>
      </div>
    //  </Provider>
    );
  }
}

export default App;
