import React from 'react'
import {connect} from 'react-redux'
import AgendaList from '../agendas/AgendaList'
import {startGetAgendas} from '../../actions/agendas'
import { Link } from 'react-router-dom'

class BatchShow extends React.Component {
    componentDidMount() {
        this.props.dispatch(startGetAgendas(this.props.match.params.batchId))
    }

    render() {
        return (
            <>
                <h4 style={{marginTop:10, marginBottom:10}}><Link style={{textDecoration: "none", color:"rgba(0, 0, 0, 0.7)"}} to="/code-admin/batches">Batches</Link> / <span style={{color: "#f50057"}}>{this.props.batch && this.props.batch.name}</span></h4>
                {/* <div>
                    <Link to={`/code-admin/batches/${this.props.match.params.batchId}/edit`} style={{textDecorate:'none'}}><Button size="small" color="secondary">Edit Batch</Button></Link>
                </div> */}
                {this.props.batch ? <AgendaList/> : "No such batch"}
            </>
        )
    }

}

const mapStateToProps = (state, props) => {
    return {
        batch: state.batches.find(batch=> batch._id === props.match.params.batchId)
    }
}

export default connect(mapStateToProps)(BatchShow)