import axios from '../config/axios'

const setTags = (tags) => {
    return {type: 'SET_TAGS', payload: tags}
}

 const addTag = (tag) => {
    return {type: 'ADD_TAG', payload: tag}
}

export const addTags = (tags) => {
    return {type: 'ADD_TAGS', payload: tags}
}

const removeTag = (id) => {
    return {type: 'REMOVE_TAG', payload: id}
}

const updateTag = (id, tag) => {
    return {type: 'UPDATE_TAG', payload: {id, tag}} 
}

export const startGetTags = () => {
    return (dispatch) => {
        axios.get('/tags')
            .then(response => {
                const tags = response.data
                dispatch(setTags(tags))
            })
            .catch(err => {
                // console.log('startGetTags err', err)
            })
    }
}

// export const startPostTag = (formData) => {
//     return (dispatch) => {
//         axios.post('/tags', formData)
//             .then(response => {
//                 const tag = response.data
//                 dispatch(addTag(tag))
//             })
//             .catch(err => {
//                 console.log('startPostTag err', err)
//             })
//     }
// }

export const startDeleteTag = (id) => {
    return (dispatch) => {
        axios.delete(`/tags/${id}`)
            .then(response => {
                const id = response.data._id
                dispatch(removeTag(id))
            })
            .catch(err => {
                // console.log('startDeleteTag err', err)
            })
    }
}

export const startPutTag = (id, formData) => {
    return (dispatch) => {
        axios.put(`/tags/${id}`, formData)
            .then(response=>{
                const tag = response.data
                const id = tag._id
                dispatch(updateTag(id, tag))
            })
            .catch(err => {
                // console.log('update tag error', err)
            })
    }
}