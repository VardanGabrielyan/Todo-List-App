import React, { Component } from 'react';
import Header from "./components/header"
import Content from "./components/content"
import  "./styles/styles.css"


class App extends Component {
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

export default App;
