import React, {Component} from 'react';
import {comment} from './CommentFunctions';
import console from 'console';
import axios from 'axios';

import './comment.css';

class Comment extends Component {
    constructor(props) {
        super(props)
        this.state={
          item: '',
          adds:[]
      }
      this.onSubmit = this.onSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        e.preventDefault()
        console.log(this.state);

        const add = {
            item: this.state.item
        }

        comment(add).then(res => {
            if (res) {
                this.props.history.push('/showComment');
            }
        })
    }
  

    componentWillMount(){
      axios.get('/adds').then((response) => {
          console.log(response.data);
          this.setState({
              comments: response.data
          })
      });
  }

render() {
  let adds = this.state.adds.map((cm) =>{
    return(
        <tr>
            <td>{cm.item}</td>
        </tr>
    )
});
    return (
      <div>
      <div className="header">Comment Section</div>
      <div className="body">
          <ul>
           <tbody>{adds}</tbody> 
          </ul>
      </div>
      <form onSubmit={this.onSubmit}>
      <div className="footer">
          <input 
          type="text" 
          value={this.state.item} 
          name="item"
          placeholder="Add your text......"
          onChange={this.onChange}
          required/>
          <button type="submit" value="Submit">+</button>
      </div>
      </form>
  </div>
    )
} 
}

export default Comment
