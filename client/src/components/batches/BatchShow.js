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
            <div style={{display:'flex', flexDirection:"column", alignItems:"center", width:"80%"}}>
                <h4 style={{marginTop:10, marginBottom:10}}><Link style={{textDecoration: "none", color:"rgba(0, 0, 0, 0.7)"}} to="/code-admin/batches">Batches</Link> / <span style={{color: "#f50057"}}>{this.props.batch && this.props.batch.name}</span></h4>
                {this.props.batch ? <AgendaList/> : "No such batch"}
            </div>
        )
    }

}

const mapStateToProps = (state, props) => {
    return {
        batch: state.batches.find(batch=> batch._id === props.match.params.batchId)
    }
}

export default connect(mapStateToProps)(BatchShow)