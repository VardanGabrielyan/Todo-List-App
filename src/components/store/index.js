import React from "react";
import {createStore} from 'redux';
import thunk from 'redux-thunk'
import reducer from '../reducers'
import uuid from 'uuid';


const initialState = { 
        good:  [{  id: uuid() , value:''}],
        bad:   [{  id: uuid(), value:''}],
        GoodIsSelectedInput: null,
        BadIsSelectedInput: 1,
    };

//const middleware = [thunk]

//const TodoStoreContext = React.createContext();

const store = createStore(reducer, initialState); 

// const TodoStore = WrappedComponent =>{
//     return class extends React.Component {
//         state = {
//             GoodIsSelectedInput: 1,
//             good: [{id: 1 }],
//             BadIsSelectedInput: 1,
//             bad: [{id: 1 }]
//         }

//         render(){
//             return(
                
//             )
//         }
//     }
// }

export default store;