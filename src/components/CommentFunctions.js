import axios from 'axios'

export const comment = newComment => {
    return axios
    .post('/adds', {
        item: newComment.item
    })
    .then(res => {
        console.log("Added!")
    })
    .catch(err => {
        console.log(err)
    })
    
}