import React from 'react'
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'

class BatchForm extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            name: props.batch ? props.batch.name : '',
            isOngoing: props.batch ? props.batch.isOngoing : true
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name,
            isOngoing: this.state.isOngoing
        }
        this.props.handleSubmit(formData)
    }

    handleOngoingChange = (e) => {
        this.setState({isOngoing: e.target.checked})
    }

    handleChange = (e) => {
        this.setState({name: e.target.value})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} style={{display:"flex", flexDirection: "column", alignItems:"center"}}>
                <label></label>
                <FormControlLabel 
                    size="small"
                    label={this.state.isOngoing ? 'Ongoing' : 'Completed'}
                    control = {
                        <Switch
                        size="small" 
                        checked={this.state.isOngoing} 
                        onChange={this.handleOngoingChange} 
                        />
                }
                >
                </FormControlLabel>
                <TextField margin="dense" required={true} size="small" name="name" label="name" value={this.state.name} onChange={this.handleChange} style={{width: 300}}/>

                <Button type="submit" size="small" color="secondary">Edit</Button>

            </form>
        )
    }
}

const mapStateToProps = (state, props) => {
    if (props.id) {
        return {
            batch: state.batches.find(batch=> batch._id == props.id)
        }
    } else {
        return {
            batch: null
        }
    }
}

export default connect(mapStateToProps)(BatchForm)