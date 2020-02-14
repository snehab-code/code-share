import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {Controlled as CodeMirror} from 'react-codemirror2'
import { Markup } from 'interweave'
import {withRouter, Link} from 'react-router-dom'

import 'codemirror/theme/neo.css'
import 'codemirror/mode/javascript/javascript.js'

class Note extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            editAccess: props.editAccess,
            title: props.title,
            code: props.code,
            description: props.description,
            tags: props.tags
        }
    }

    handleRemove = (id)=>{
        this.props.handleRemove(id)
    }

    render() {
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <div style={{width:"100%"}}>
                        <div style={{float: "right", marginRight:"-10px", marginTop:"auto"}}>
                            {this.state.editAccess && 
                            <Link to={{
                                pathname: `/code-admin/batches/${this.props.match.params.batchId}/agendas/${this.props.match.params.batchId}/notes/edit`,
                                state: {
                                    title: this.props.title,
                                    code: this.props.code,
                                    description: this.props.description,
                                    tags: this.props.tags,
                                    noteId: this.props._id
                                }
                            }}>
                                <Button style = {{padding:7, margin:0, minWidth:20}} size="small" color="secondary">     
                                <EditOutlinedIcon fontSize="small" />
                                </Button>  
                            </Link>}
                            {this.state.editAccess && <Button style = {{padding:7, margin:0, minWidth:20}} size="small" color="secondary"  onClick = {() => this.handleRemove(this.props._id)}>
                                <DeleteOutlinedIcon fontSize="small"  />
                            </Button>}   
                            <Button style = {{padding:7, margin:0, minWidth:20}} size="small" color="secondary">         
                                <ExpandMoreIcon size="large"/> 
                            </Button>                            
                        </div>
                        <span style={{fontSize:"1.2em", color:"#f50057"}}>{this.state.title}</span>
                        
                        <Markup content={this.state.description}/>
                    </div>
                    <div>
                        
                    </div>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>
                    <div style={{width:"100%"}}>
                        <CodeMirror
                            value={this.state.code}
                            options={{lineNumbers: true, theme: 'neo',readOnly: this.state.editAccess, lineWrapping: true}}
                        />
                        <div style={{marginTop:10}}>
                            Tags: 
                        </div>
                    </div>

                </ExpansionPanelDetails>                
            </ExpansionPanel>
        )
    }
    
}

export default withRouter(Note)