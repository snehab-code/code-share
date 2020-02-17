import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {startDeleteBatch} from '../../actions/batches'
import BatchAdd from './BatchAdd'
import BatchEdit from './BatchEdit'

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
import Button from '@material-ui/core/Button'

import Modal from 'react-modal'
import Swal from 'sweetalert2'

// styles for Modal
const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        backgroundColor       : 'white',
        display               : "flex",
        flexDirection         : "column",
        alignItems            : "center"
      }
}

class BatchShow extends React.Component {
    constructor() {
        super()
        this.state = {
            showCompleted: false,
            edit: '',
            modalIsOpen: false,
            showAdd: false
        }
    }

    componentDidMount() {
        Modal.setAppElement('#root')
    }

    handleShowCompleted = () => {
        this.setState(prevState => ({showCompleted: !prevState.showCompleted}))
    }

    handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This will delete all agendas and notes linked to this batch",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              this.props.dispatch(startDeleteBatch(id))
            }
          })

    }

    handleEdit = (id) => {
        this.setState({edit: id, modalIsOpen: true})
    }

    handleAdd = () => {
        this.setState({showAdd: true, modalIsOpen: true})
    }

    closeModal = () => {
        this.setState({modalIsOpen: false, edit:'', showAdd:false})
    }


    render(){
        return (
            <div className="content-container" style={{textAlign: "center", width:"80%"}}>
                <h4 style={{marginTop:10, marginBottom:10, color: "#f50057"}}>Batches</h4>
                <Modal
                    isOpen = {this.state.modalIsOpen}
                    onRequestClose = {this.closeModal}
                    style={customStyles}
                    contentLabel = "Batch modal"
                >
                    {
                        this.state.showAdd && <BatchAdd closeModal={this.closeModal}/>
                    }
                    {
                        this.state.edit && <BatchEdit closeModal={this.closeModal} id={this.state.edit} />
                    }

                </Modal>
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
                <br/>
                <Button size="small" color="secondary" variant = "outlined" onClick={this.handleAdd}>Add Batches</Button>

                <List className="batchlist" style={{background: "white"}}>
                {   !this.props.batches[0] && !this.props.completedBatches[0] ? 'No batches added' :
                    !this.props.batches[0] && !this.state.showCompleted ? 'No ongoing batches' : 
                    this.props.batches.map(batch => {
                        return (
                          <ListItem key={batch._id} >
                            <Link to={`/code-admin/batches/${batch._id}`} style={{width:"100%", textDecoration:"none", color: "rgba(0, 0, 0, 0.87)"}}>
                                <ListItemText
                                primary={batch.name}
                                />
                            </Link>
                            <ListItemIcon>
                                <>
                              <IconButton aria-label="delete" onClick={() => this.handleDelete(batch._id)} color="secondary">
                                <DeleteIcon />
                              </IconButton>
                              <IconButton aria-label="edit" onClick={() => this.handleEdit(batch._id)} color="secondary">
                                <EditIcon />
                              </IconButton>
                                </>
                            </ListItemIcon>
                          </ListItem>
                        )
                    })
                }

                {   this.props.batches[0] && this.state.showCompleted && !this.props.completedBatches[0] ? 'No completed batches' :
                    !this.props.batches[0] && !this.props.completedBatches[0] && this.state.showCompleted ? '' :
                    this.state.showCompleted &&
                    this.props.completedBatches.map(batch => {
                        return (
                            <ListItem key={batch._id} >
                              <Link to={`/code-admin/batches/${batch._id}`} style={{width:"100%", textDecoration:"none", color: "rgba(0, 0, 0, 0.87)"}}>
                                <ListItemText
                                primary={batch.name}
                                />
                              </Link>
                              <ListItemIcon>
                                  <>
                                <IconButton aria-label="delete" onClick={() => this.handleDelete(batch._id)} color="secondary">
                                  <DeleteIcon />
                                </IconButton>
                                <IconButton aria-label="edit" onClick={() => this.handleEdit(batch._id)} color="secondary">
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