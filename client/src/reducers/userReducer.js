const userReducer = (state = {isLoggedIn: false}, action) => {
    switch(action.type) {
        case 'LOGIN_USER': {
            return {isLoggedIn: true}
        }
        default: {
            return state
        }
    }
}

export default userReducer