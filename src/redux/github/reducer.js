const initialState = {
    data : []
};

 const gitReducer = (state = initialState, action) => {
    if(action.type === "GIT_REPOS"){
        return {...state, data : action.payload}
    }
    return state;
};
export default gitReducer;