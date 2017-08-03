import axios from 'axios';

export const getRepos = (name = "rederlo") => {
    return (dispatch) => {
        axios.get(`https://api.github.com/users/${name}/repos`)
        .then(response => {
            dispatch({type : "GIT_REPOS", payload : response.data});
        })
        .catch((e) => {
            dispatch({type : "ERROR_GIT"})
        });
    };
};