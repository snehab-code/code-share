import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
// import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Button from '@material-ui/core/Button'
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Controlled as CodeMirror} from 'react-codemirror2'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
// import { Markup } from 'interweave';

import 'codemirror/lib/codemirror.css'
import'codemirror/theme/material.css'
import'codemirror/theme/neat.css'
import'codemirror/mode/javascript/javascript.js'

const styles = theme => ({
    
    root: {
        width: '100%',
        "& > *": {
            margin: theme.spacing(3)
          }
      },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
  })


class Note extends React.Component {
    
    constructor() {
        super()
        this.state = {
            editAccess: false,
            title: '',
            code: '',
            description: ''
        }
    }

    static getDerivedStateFromProps(props) {
        return {
            title: props.title,
            code: props.code,
            description: props.description,
            editAccess: props.editAccess,
            tags : props.tags
        }
    }
    componentDidUpdate(){
        const editor = this.state.editor;
    
        if ( editor ) {
            editor.isReadOnly = this.props.editAccess
        }
    }

    handleChange = () => {
        if (this.state.editAccess) {

        }
    }
    handleRemove = (id)=>{
        this.props.handleRemove(id)

    }
    handleEdit  = (id) => {
        this.props.handleEdit(id)
    }
    render() {
        const classes = this.props
        return (
                <div className={classes.root} style={{textAlign:"left", width:"100%",fontFamily:'Roboto'}}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            // expandIcon={<ExpandMoreIcon color="secondary" />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <div style={{width:"100%"}}>
                                {
                                this.state.editAccess && 
                                <div style={{float: "right", marginRight:"-10px", marginTop:"auto"}}>
                                    <Button style = {{padding:0, margin:0, minWidth:20}} size="small" color="secondary"  onClick={()=>this.handleEdit(this.props._id)}>     
                                        {/* <EditOutlinedIcon fontSize="small" /> */}
                                        edit
                                    </Button>
                                    <Button style = {{padding:0, margin:0, minWidth:20}} size="small" color="secondary"  onClick = {() => this.handleRemove(this.props._id)}>
                                        {/* <DeleteOutlinedIcon fontSize="small"  /> */}
                                        delete
                                    </Button>                                     
                                </div>
                                }
                                <span style={{fontSize:"1.2em", color:"#f50057"}}>{this.state.title}</span>
                            </div>
                            <div>
                                
                            </div>
                        </ExpansionPanelSummary>

                        <ExpansionPanelDetails>
                            <div style={{width:"100%"}}>
                                {/* <Markup content={this.state.description} /> */}
                                <CodeMirror
                                    value={this.state.code}
                                    options={{lineNumbers: true, theme: 'material',readOnly: this.state.editAccess}}
                                    onBeforeChange={(editor, data, value) => {
                                        this.setState({value});
                                    }}
                                    onChange={(editor, data, value) => {
                                        this.setState({value});
                                    }}
                                />
                            </div>
                        </ExpansionPanelDetails>
                        
                        <ExpansionPanelDetails>
                            {this.state.tags.length!=0 && <div>Tags: {
                            this.state.tags.map(tag => {
                                if (tag) {
                                return tag.name}
                            }).join(',')}</div>
                            }
                        </ExpansionPanelDetails>

                        
                    </ExpansionPanel>
                </div>
        )
    }
    
}
Note.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles,{ withTheme: true })(Note)