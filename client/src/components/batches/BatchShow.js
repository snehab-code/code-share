import React from 'react'
import {connect} from 'react-redux'
import AgendaList from '../agendas/AgendaList'
import {startGetAgendas} from '../../actions/agendas'
import Button from '@material-ui/core/Button'

class BatchShow extends React.Component {
    componentDidMount() {
        this.props.dispatch(startGetAgendas(this.props.match.params.batchId))
    }

    render() {
        console.log(this.props.batch)
        return (
            <>
                <h3 style={{marginTop:10, marginBottom:10}}>{this.props.batch && this.props.batch.name}</h3>
                <div>
                    <Button size="small" color="secondary">Edit Batch</Button>
                </div>
                {this.props.batch ? <AgendaList/> : "No such batch"}
            </>
        )
    }

}

const mapStateToProps = (state, props) => {
    return {
        batch: state.batches.find(batch=> batch._id == props.match.params.batchId)
    }
}

export default connect(mapStateToProps)(BatchShow)