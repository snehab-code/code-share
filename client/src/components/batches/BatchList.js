import React from 'react'
import { connect } from 'react-redux'

import {startPostBatch, startDeleteBatch, startPutBatch} from '../../actions/batches'

// material ui imports
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'

class BatchShow extends React.Component {
    constructor() {
        super()
        this.state = {
            showCompleted: false
        }
    }

    handleShowCompleted = () => {
        this.setState(prevState => ({showCompleted: !prevState.showCompleted}))
    }

    handleDelete = (id) => {
        console.log(id)
    }

    render(){
        return (
            <div className="content-container" style={{textAlign: "center", width:"80%"}}>
                
                <FormControlLabel 
                    style={{margin:10}}
                    labelPlacement="top"
                    control={
                        <Switch
                        size="small" 
                        checked={this.state.showCompleted} 
                        onChange={this.handleShowCompleted} value="showCompleted" 
                        
                        />
                }
                label={this.state.showCompleted ? "Show ongoing" : "Show all"}
                />

                <List className="batchlist" style={{background: "white"}}>
                {   
                    this.props.batches.map(batch => {
                        return (
                          <ListItem key={batch._id} >
                            <ListItemText
                              primary={batch.name}
                            />
                            <ListItemIcon>
                                <>
                              <IconButton aria-label="delete" onClick={() => this.handleDelete(batch._id)}>
                                <DeleteIcon />
                              </IconButton>
                              <IconButton aria-label="edit" onClick={() => this.handleDelete(batch._id)}>
                                <EditIcon />
                              </IconButton>
                                </>
                            </ListItemIcon>
                          </ListItem>
                        )
                    })
                }

                {   this.state.showCompleted &&
                    this.props.completedBatches.map(batch => {
                        return (
                            <ListItem key={batch._id} >
                              <ListItemText
                                primary={batch.name}
                              />
                              <ListItemIcon>
                                  <>
                                <IconButton aria-label="delete" onClick={() => this.handleDelete(batch._id)}>
                                  <DeleteIcon />
                                </IconButton>
                                <IconButton aria-label="edit" onClick={() => this.handleDelete(batch._id)}>
                                  <EditIcon />
                                </IconButton>
                                </>
                              </ListItemIcon>
                            </ListItem>
                          )
                      })
                }
                </List>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        batches: state.batches.filter(batch=>batch.isOngoing),
        completedBatches: state.batches.filter(batch=>!batch.isOngoing)
    }
}

export default connect(mapStateToProps)(BatchShow)