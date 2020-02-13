import React from 'react'

// Ask sir - should there be a link to all agendas that have been set to isVisible = true?

class OtpForm extends React.Component{
    constructor() {
        super()
        this.state = {
            otp: ""
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const otp = this.state.otp
        this.props.handleOtpMatch(otp)
    }

    handleChange = (e) => {
        if (e.target.value.length <= 6) {    
            this.setState({[e.target.name]: e.target.value.toUpperCase()})
        }
    }

    render() {
        return (
            <>
                <span className="message">Enter OTP</span><br/>
                <form onSubmit={this.handleSubmit}>
                <input type="text" name="otp" style={{height:65, width:175, fontSize:30, textAlign:"center"}} spellCheck="false" autoComplete="on" value={this.state.otp} onChange={this.handleChange}/>
                </form>
            </>
        )
    }
}

export default OtpForm