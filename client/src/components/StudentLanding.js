import React from 'react'
import {startGetStudentAgenda, removeStudentAgenda} from '../actions/studentAgenda'
import {connect} from 'react-redux'
import OtpForm from './OtpForm'
import {Redirect} from 'react-router-dom'
import Button from '@material-ui/core/Button'

class StudentLanding extends React.Component{
    constructor() {
        super()
        this.state = {
            match: false,
            agenda: {},
            notice: "",
            redirect: false,
            otp: ""
        }
    }

    static getDerivedStateFromProps(props) {
        return {
            match: (props.agenda && props.agenda._id || props.agenda.notice) ? true : false,
            notice: props.agenda && props.agenda.notice,
            redirect: props.agenda && props.agenda._id ? true : false
        }
    }

    handleOtpMatch = (otp) => {
        this.setState({otp})
        this.props.dispatch(startGetStudentAgenda(otp))
    }

    handleReset = () => {
        this.props.dispatch(removeStudentAgenda())
        this.setState({match: false, notice:""})
    }

    render() {
        console.log(this.state)
        return (
            <div className="otpContainer" style={{display:"flex", flexDirection: "column", alignItems:"center", justifyContent:"center", height:"40vh"}}>
                {   
                
                !this.state.match ? 
                    
                    <OtpForm handleOtpMatch={this.handleOtpMatch}/> 
                    : 
                    <span style={{textAlign:"center"}}>
                        {this.state.notice}
                        <br/>
                        <Button variant="outlined" color="secondary" onClick={this.handleReset}>Try again</Button>
                    </span>

                }

                {
                    this.state.redirect && <Redirect to ={{
                        pathname: `/agendas/${this.props.agenda._id}`,
                        state: {match: true, otp: this.state.otp}
                    }} />
                }
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        agenda: state.studentAgenda
    }
}

export default connect(mapStateToProps)(StudentLanding)