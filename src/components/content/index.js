import React from "react";
import  "./styles.css"
import TableInput from "./tableInput";
import GoodTodo from "./GoodTodo.js"
import BadTodo from "./BadTodo.js"


export class Content extends React.Component  {

   
    // _currentId = 1;
    //     get currentId() {
    //         return ++this._currentId;    
    //     }   

    // constructor(props){
    //     super(props)
    //     this.state = {
    //         isSelectedInput: 1,
    //         good: [{id: 1 }],
    //         bad: []
           
    //     };
    // }


//   addLabel = (type) =>  {
//         switch (type) {
//             case 'good':
//             // console.log(this.state.good)
                        
//                 this.setState({
//                         good: [
//                             ...this.props.good, 
//                             {
//                                 id: this.currentId
                                                                  
//                             }
//                         ]
//                 });
//                 break;
//             case 'bad':
                
//             this.setState({
//                 bad: [
//                     ...this.props.bad, 
//                     {
//                         id: this.currentId
                                                          
//                     }
//                 ]
//         });
                
//                 break;
//             default:
//                 break;
//         }
//     }

    // handleChange = event => {
    //    const value=event.target.value;
        
    //    if(value.length){
    //         this.setState( () => {
    //             return {
    //                 good: [
    //                     ...this.state.good,
    //                         <TableInput
    //                             key={this.id}
    //                             isSelectedInput={this._currentId === this.id}
    //                             id={this.id}
    //                             handleChange={this.handleChange}
    //                             onKeyDownHandler={this.onKeyDownHandler} 
    //                         />

    //                 ]
    //             }
    //         }                
    //         )
    //     }
    // }
        // if (!value.length && this.state.good.length > 2)  {            
        //     this.setState({
        //         good: this.state.good.slice(0, this.state.good.length - 2) 
        //     })
        // }
    
    // onKeyDownHandler = event => {

    //     if (!event.target.value.trim().length && event.keyCode >= 48 && event.keyCode <= 90) {
    //         this.addLabel('good')
    //         return
    //     } 
    //     if (event.keyCode === 13 && event.target.value.length) {    
    //         console.log('enter' );
            
    //         this.setState({
    //             isSelectedInput: this.state.good[this.state.good.length-1].id
                
    //         })
    //         console.log(this.state.isSelectedInput)
    //         console.log(this.state.good)
    //         return
    //     }
    //     if (event.target.value.trim().length === 1 && event.keyCode === 8){
            
    //         this.setState({
    //             good: this.state.good.slice(0, this.state.good.length - 1)
    //         })
    //     }
    // }

    // onCutHandler = (event) => {

    //     console.log('_currentId', event.target.value, event.target.value.trim().length, this.state.good.length);

    //     if (!event.target.value.trim().length && this.state.good.length >= 2){
    //         this.setState({
    //             good: this.state.good.slice(0, this.state.good.length - 1)
    //         })
    //     } 
    // }

render(){
    return(           
        <tr>

            <GoodTodo />

            <BadTodo />
            
        </tr>
        )
    }
}
export default Content