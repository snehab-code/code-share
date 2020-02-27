import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {Controlled as CodeMirror} from 'react-codemirror2'
import { Markup } from 'interweave'
import {withRouter, Link} from 'react-router-dom'

import './codemirror-mod.css'
import 'codemirror/theme/neo.css'
import 'codemirror/mode/javascript/javascript.js'

function Note(props){

    let copyCode = React.createRef()
    
    const handleRemove = (id) =>{
        props.handleRemove(id)
    }

    const handleCopy = (e) => {
        e.stopPropagation()
        copyCode.current.select()
        document.execCommand('copy')
    }

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary>
                <div style={{width:"100%"}}>
                    <div style={{float: "right", marginRight:"-10px", marginTop:"auto"}}>
                        {props.editAccess && 
                        <Link to={{
                            pathname: `/code-admin/batches/${props.match.params.batchId}/agendas/${props.match.params.agendaId}/notes/edit`,
                            state: {
                                title: props.title,
                                code: props.code,
                                description: props.description,
                                tags: props.tags,
                                noteId: props._id
                            }
                        }}>
                            <Button style = {{padding:7, margin:0, minWidth:20}} size="small" color="secondary">     
                            <EditOutlinedIcon fontSize="small" />
                            </Button>  
                        </Link>}
                        {props.editAccess && 
                            <Button style = {{padding:7, margin:0, minWidth:20}} size="small" color="secondary"  onClick = {(e) => {e.stopPropagation(); handleRemove(props._id)}}>
                                <DeleteOutlinedIcon fontSize="small"  />
                            </Button>
                        }   
                        {/* <Button style = {{padding:7, margin:0, minWidth:20}} size="small" color="secondary">         
                            <ExpandMoreIcon/> 
                        </Button>      */}
                        {!props.editAccess && 
                            <Button style = {{padding:7, margin:0, minWidth:20}} size="small" color="secondary" onClick={handleCopy}>
                                
                                <input type="text" value={props.code} readOnly ref = {copyCode} style={{width:30, borderRadius:5, border:"1px solid lightgrey", fontSize:"0.8em", color: "lightgrey", padding:2}}/><FileCopyIcon fontSize="small"/> 
                            </Button> 
                        }
                                               
                    </div>
                    <span style={{fontSize:"1.2em", color:"#f50057"}}>{props.title}</span>
                    
                    <Markup content={props.description}/>

                    <span style={{fontSize:"0.8em", color:"rgba(0, 0, 0, 0.7)"}}>Tags: {
                        props.tags.map((tag, i) => {
                            if (tag) {
                                if (i < props.tags.length - 1) {
                                    return `${tag.name}, `
                                } else {
                                    return `${tag.name}.`
                                }
                            }
                        })
                    } </span> 

                </div>
                <div>
                    
                </div>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails>
                <div style={{width:"100%"}}>
                    <CodeMirror
                        value={props.code}
                        options={{lineNumbers: true, theme: 'neo',readOnly: props.editAccess, lineWrapping: true}}
                    />
                </div>

            </ExpansionPanelDetails>                
        </ExpansionPanel>
    )
}

export default withRouter(Note)