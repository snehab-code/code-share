import React from 'react'
import Select from 'react-select';
import withRouter from 'react-router-dom'

import Button from '@material-ui/core/Button'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
            mode: 'javascript'
        }
        // this.instance = null;
    }
   
    handleChange  = (e) => {
        this.setState({ 
            [e.target.name] : e.target.value
        })
    }

    handleSubmit  = (e) => {
        e.preventDefault()
        const formData = {
            title : this.state.title,
            description : this.state.description,
            code : this.state.code,
            agenda : this.props.agenda,
            tags : this.state.tags
        }
        this.props.handleSubmit(formData)
    }
    
	changeMode=(e) =>{
        const mode = e.target.value;
		this.setState({
			mode: mode
		});
	}
	
    render(){
        return (
            <form onSubmit = {this.handleSubmit}>
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
                <Button type="submit" variant="outlined" size="small" color="secondary">Submit</Button>
            </form>
        )

    }
}



export default NoteForm