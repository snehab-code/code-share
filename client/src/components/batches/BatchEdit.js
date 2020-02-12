import React from 'react'
import BatchForm from './BatchForm'
import {startPutBatch} from '../../actions/batches'
import {connect} from 'react-redux'

function BatchEdit(props) {

    const handleSubmit = (formData) => {
        props.dispatch(startPutBatch(formData, props.id))
        props.closeModal()
    }

    return (
        <>
            <h3>Edit Batch</h3>
            <BatchForm handleSubmit={handleSubmit} id={props.id}/>
        </>
    )
}

export default connect()(BatchEdit)