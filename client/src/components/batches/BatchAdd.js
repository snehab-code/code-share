import React from 'react'
import BatchForm from './BatchForm'
import {startPostBatch} from '../../actions/batches'
import {connect} from 'react-redux'

function BatchAdd(props) {

    const handleSubmit = (formData) => {
        props.dispatch(startPostBatch(formData))
        props.closeModal()
    }

    return (
        <>
            <h3>Add Batch</h3>
            <BatchForm handleSubmit={handleSubmit}/>
        </>
    )
}

export default connect()(BatchAdd)