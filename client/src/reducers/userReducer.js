const userReducer = (state = {isLoggedIn: null}, action) => {
    switch(action.type) {
        case 'LOGIN_USER': {
            return {isLoggedIn: true}
        }
        case 'LOGOUT_USER' : {
            return {isLoggedIn: false}
        }
        default: {
            return state
        }
    }
}

export default userReducer