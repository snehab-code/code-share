import React from 'react'
import {startUserLogin} from '../actions/user'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", border:"1px solid #f0b460", borderRadius: 12,  marginTop:"7%", padding:20, height:270, width:400}}>
                <h1 style={{margin:0, padding:0, paddingBottom:10, color: "#f50057"}}>Sign In</h1>
                {this.props.notice}
                <form onSubmit={this.handleSubmit} style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                {/* <label htmlFor="secretKey">Enter key</label> */}
                <TextField color="secondary" variant="outlined" margin="dense" type="password" id="secretKey" required={true} size="small" name="title" label="Enter Key" value={this.state.key} onChange={this.handleChange} style={{width: 300}}/>
                {/* <input id="secretKey" type="password" value={this.state.key} onChange={this.handleChange}/> */}
                {/* <input type="submit"/> */}
                <br/>
                <Button color="secondary" style={{width:300}} type="submit" variant="outlined" >Submit</Button>
                </form>
            </div>
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