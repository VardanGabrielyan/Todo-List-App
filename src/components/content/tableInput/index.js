import React from "react";
import './styles.css';
import GoodTodo from "./GoodTodo.js"
import BadTodo from "./BadTodo.js"

    class TableInput extends React.Component {
       

    inp = null;
    componentDidMount() {  
        if (this.props.isSelectedInput) {
            this.inp.focus()        
        };
    }
    componentDidUpdate() {  
        if (this.props.isSelectedInput) {
            this.inp.focus()        
        };
    }

    inputRef = input => this.inp = input; 
    
    render(){
       
        return(

            <div >
                <input 
                    ref={this.inputRef}
                    key={this.props.key}
                    value={this.props.value} 
                    autoFocus={this.props.isSelectedInput === this.props.id}
                    id={this.props.id}
                    onKeyDown={this.props.onKeyDownHandler}
                    //onChange={this.props.onCutHandler}
                    //onFocus={this.props.onFocusHandler}
                 />
                <input type="checkbox"/>
                
            </div>
        )
    }
}
export default TableInput;
