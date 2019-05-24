import React, {Component} from 'react';
import {comment} from './CommentFunctions';
import console from 'console';
import axios from 'axios';

import './comment.css';

class showComment extends Component {
    constructor(props) {
        super(props)
        this.state={
          adds:[]
      }
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

    let adds = this.state.products.map((ad) =>{
        return(
            <tr>
                <td>{ad.id}</td>
                <td><img src={ad.item}/></td>
                <td>{ad.created}</td>
            </tr>
        )
    });
    return(
    <div className="body">
    <ul>
     <tbody>{adds}</tbody> 
    </ul>
    </div>);
} 
}

export default showComment
