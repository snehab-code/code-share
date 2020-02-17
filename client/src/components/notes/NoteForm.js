import React from 'react'
import {connect} from 'react-redux'

import Button from '@material-ui/core/Button'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CreatableSelect from 'react-select/creatable'

import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/neo.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';

class NoteForm extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            title: props.title ? props.title : '',
            description : props.description ? props.description : '',
            code : props.code ? props.code : '',
            tags: props.tags ? props.tags : [],
            mode: 'javascript',
            noteId: props.noteId ? props.noteId : '',
            noteTags: props.noteTags ? props.noteTags : []
        }
    }
   
    handleChange  = (e) => {
        this.setState({ 
            [e.target.name] : e.target.value
        })
    }

    handleSubmit  = (e) => {
        e.preventDefault()
        if (e.target.id === "noteForm") {
            const formData = {
                title : this.state.title,
                description : this.state.description,
                code : this.state.code,
                agenda : this.props.agenda,
                tags : this.state.noteTags
            }
            this.props.handleSubmit(formData, this.state.noteId)    
        }    
    }
    
	changeMode=(e) =>{
        const mode = e.target.value;
		this.setState({
			mode: mode
		});
    }
    
    handleTagChange = (newValue) => {
            if (newValue) {
                this.setState({noteTags: newValue})
            } else {
                this.setState({noteTags: []})
            }
    }
	
    render(){
        return (
            <form id="noteForm" onSubmit = {this.handleSubmit} style={{border:"2px solid white", borderRadius:12, padding:20, width:"80%", maxWidth:"600px"}}>
                <label htmlFor = "title"> Title </label>
                <input type = "text" value = {this.state.title} 
                    onChange ={this.handleChange} 
                    name = "title" 
                    id = "title"
                    style={{width:'100%'}}
                /><br/>
                <label htmlFor = "title"> Description </label>
                <CKEditor
                        editor={ ClassicEditor }
                        data={this.state.description}
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            this.setState({description:data})
                        } }
                    />
                <div style={{ marginTop: 10 }}>
                <label htmlFor = "code"> Select mode </label>
                    <select onChange={this.changeMode} value={this.state.mode}>
                        <option value="htmlmixed">HTML</option>
                        <option value="javascript">JavaScript</option>
                        <option value="css">CSS</option>
                    </select>
                </div>
                <CodeMirror
                    ref="editor" 
                    value={this.state.code}
                    editorDidMount={editor => { this.instance = editor }}
                    options={{
                        lineNumbers: true,
                        scrollbarStyle: null,
                        lineWrapping: true,
                        theme: 'neo',
                        mode: this.state.mode,
                        readOnly: false
                    }}
                    onBeforeChange={(editor, data, code) => {
                        this.setState({ code });
                    }}
                    onChange={(editor, data, code) => {
                        this.setState({ code });
                        
                    }}
                    autoFocus={true} 

                    />
                <br/>
                <CreatableSelect
                    isMulti
                    cacheOptions
                    onChange={this.handleTagChange}
                    options={this.props.creatableTags}
                    value = {this.state.noteTags}
                />
                <Button type="submit" variant="outlined" size="small" color="secondary">Submit</Button>
            </form>
        )

    }
}


const mapStateToProps = (state, props) => {
    return {
        allTags: state.tags,
        creatableTags: state.tags.map(tag => {
            return {
                label: tag.name,
                value: tag._id
            }
        }),
        noteTags: props.tags && props.tags.map(tag => { 
            return {
                label: tag.name,
                value: tag._id
            }
        })
    }
}

export default connect(mapStateToProps)(NoteForm)