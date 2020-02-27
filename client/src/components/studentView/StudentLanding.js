import React from 'react'
import {startGetStudentAgenda, removeStudentAgenda} from '../../actions/studentAgenda'
import {clearStudentNotes} from '../../actions/studentNotes'
import {connect} from 'react-redux'
import OtpForm from './OtpForm'
import Button from '@material-ui/core/Button'

class StudentLanding extends React.Component{
    constructor() {
        super()
        this.state = {
            match: false,
            agenda: {},
            notice: ""
        }
    }

    componentDidMount() {
        console.log('i ran')
        this.props.dispatch(removeStudentAgenda())
        this.props.dispatch(clearStudentNotes())
    }

    static getDerivedStateFromProps(props) {
        return {
            match: (props.agenda && (props.agenda._id || props.agenda.notice)) ? true : false,
            notice: props.agenda && props.agenda.notice,
            redirect: props.agenda && props.agenda._id ? true : false
        }
    }

    handleOtpMatch = (otp) => {
        this.props.dispatch(startGetStudentAgenda(otp, this.props.history))
    }

    handleReset = () => {
        this.props.dispatch(removeStudentAgenda())
        this.setState({match: false, notice:""})
    }

    render() {
        console.log('auaua', this.state)
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