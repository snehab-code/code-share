import React from 'react'
import axios from '../../config/axios'
import Select from 'react-select';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/neat.css';


import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';


// const filterTags = (inputValue) => {
//     return tagOptions.filter(i =>
//       i.label.toLowerCase().includes(inputValue.toLowerCase())
//     );
//   };
  
// const promiseOptions = inputValue =>
//     new Promise(resolve => {
//       setTimeout(() => {
//         resolve(filterTags(inputValue));
//       }, 1000);
//     });

class NoteForm extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            title: props.title?props.title: '',
            description : props.description?props.description:'<p>Add your note description here</p>',
            code : props.code?props.code:props.defaults['htmlmixed'],
            tags:[],
            noteTags:props.tags && props.tags.name?props.tags.map(opt => ({ label: opt.name, value: opt._id })):[],
			readOnly: false,
			mode: 'htmlmixed'
            
        }
        this.instance = null;
    }
    componentDidMount(){
        
        axios.get('/tags' )
        .then(response => {
            const tags = response.data.map(opt => ({ label: opt.name, value: opt._id }))
            this.setState({tags})            
        })
        .catch(err => {
            this.props.history.push('/code-admin')
        })
    }
   
    handleChange  = (e) => {
        this.setState({ 
            [e.target.name] : e.target.value
        })
    }
    handleTagChange  = (e) => {
            
            const noteTags = []
            if(e){
                for(let val of e){
                    noteTags.push(val.value)
                } 
            }
             

            this.setState({noteTags})
           
    }

    handleSubmit  = (e) => {
        e.preventDefault()
        const formData = {
            title : this.state.title,
            description : this.state.description,
            code : this.state.code,
            agenda : this.props.agenda,
            tags : this.state.noteTags
        }
        this.props.handleSubmit(formData)
    }

    
	changeMode=(e) =>{
        const mode = e.target.value;
		this.setState({
			mode: mode,
			//code: this.props.defaults[mode]
		});
	}
	
    render(){
        const { code } = this.state
        
        let codeMirrorOptions = {
            lineNumbers: true,
            scrollbarStyle: null,
            lineWrapping: true,
            theme: 'material',
            readOnly: this.state.readOnly,
            mode: this.state.mode,
            
		}
        
        return (
            <div>
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
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                            // console.log( 'Editor is ready to use!', editor );
                            
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            // console.log( { event, editor, data } );
                            this.setState({description:data})
                        } }
                        onBlur={ ( event, editor ) => {
                            // console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            // console.log( 'Focus.', editor );
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
                        value={code}
                        editorDidMount={editor => { this.instance = editor }}
                        options={{
                            ...codeMirrorOptions
                        }}
                        onBeforeChange={(editor, data, code) => {
                            this.setState({ code });
                        }}
                        onChange={(editor, data, code) => {
                            this.setState({ code });
                           
                        }}
                        autoFocus={true} 

                     />
                    <Select options={this.state.tags}
                            defaultValue={this.state.noteTags}
                            isMulti = {true}
                            onChange={this.handleTagChange} />
                    
                    <input type = 'submit'/>
                </form>
            </div>
        )

    }
}

export default NoteForm