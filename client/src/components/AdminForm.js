import React from 'react'
import {startUserLogin} from '../actions/user'
import {connect} from 'react-redux'

class AdminForm extends React.Component {
    constructor() {
        super()
        this.state = {
            key: ''
        }
    } 

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            secret: this.state.key
        }
        this.props.dispatch(startUserLogin(formData, this.props.history))
    }

    handleChange = (e) => {
        this.setState({key: e.target.value})
    }

    render() {
        return (
            <>
                <h1>Sign In</h1>
                {this.props.notice}
                <form onSubmit={this.handleSubmit}>
                <label htmlFor="secretKey">Enter key</label>
                <input id="secretKey" type="password" value={this.state.key} onChange={this.handleChange}/>
                <input type="submit"/>
                </form>
            </>
    )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        notice: state.user.notice
    }
}

export default connect(mapStateToProps)(AdminForm)