import React, {Component} from 'react';
import axios from 'axios';

class Shop extends Component{
    constructor(props) {
        super(props);
        this.state = {
            products :[]
        };
    } 

componentWillMount(){
    axios.get('/products').then((response) => {
        console.log(response.data);
        this.setState({
            products: response.data
        })
    });
}

render(){
    let products = this.state.products.map((product) =>{
        return(
            <tr>
                <td>{product.name}</td>
                <td><img src={product.image}/></td>
                <td>{product.price}</td>
            </tr>
        )
    });
    return(<tbody>{products}</tbody> );

}

}

export default Shop;