const initialState = {
    profile: null,
    isLogin: false
};

let state = { ...initialState };

const getState = () => state;

const setState = (newState) => {
    state = { ...state, ...newState };
};

const resetState = () => {
    state = { ...initialState };
};

//set isLogin
const setLoginState = (isLogin) => {
    console.log("Trying to change login state to " + isLogin);
    setState({ isLogin });
    console.log("Login state changed to " + state.isLogin);
};

export { getState, setState, resetState, setLoginState };