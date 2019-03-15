import React from "react";
import './styles.css';
import GoodTodo from "../GoodTodo.js"
import BadTodo from "../BadTodo.js"
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


 class TableInput extends React.Component {
       
    
    inp = null;
    componentDidMount() {  
        if (this.props.GoodIsSelectedInput) {
            this.inp.focus()        
        };
    }
    componentDidUpdate() {  
        if (this.props.GoodIsSelectedInput) {
            this.inp.focus()        
        };
        if(this.props.BadIsSelectedInput){
            this.inp.focus()
        }
    }

    inputRef = input => this.inp = input; 
    
    render(){
       
        return(

            <div >
                <input 
                    ref={this.inputRef}
                    key={this.props.key}
                    value={this.props.value} 
                    id={this.props.id}
                    onKeyDown={this.props.onKeyDownHandler}
                    onCut={this.props.getSelectedTextCut}
                    onClick={this.props.onClickListener}
                    //autoFocus={this.props.BadIsSelectedInput === this.props.id}
                    //onChange={this.props.getSelectedTextRemoved}
                    //onFocus={this.props.onFocusHandler}
                 />
                <input type="checkbox"/>
                
            </div>
        )
    }
}
export default TableInput;
