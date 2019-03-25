import React from "react";

const TodoStoreContext = React.createContext();

const TodoStore = WrappedComponent =>{
    return class extends React.Component {
        state = {
            GoodIsSelectedInput: 1,
            good: [{id: 1 }],
            BadIsSelectedInput: 1,
            bad: [{id: 1 }]
        }

        render(){
            return(
                
            )
        }
    }
}