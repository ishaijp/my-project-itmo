import React, {Component} from 'react'
import {login} from './UserFunctions'
import console from 'console';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errors: []
        };

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    showValidationErr(elm, msg){
        this.setState((prevState) => ({
            errors: [
            ...prevState.errors, {
                elm,
                msg
            }
        ]
        }));
    }

    clearValidationErr(elm) {
        this.setState((prevState) => {
          let newArr = [];
          for (let err of prevState.errors) {
            if (elm !== err.elm) {
              newArr.push(err);
            }
          }
          return {errors: newArr};
        });
      }


    onSubmit(e){
        e.preventDefault()
        console.log(this.state);

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        if(this.state.email === ""){
            this.showValidationErr("email", "Email Can't Be Empty!");
        }

        if(this.state.password === ""){
            this.showValidationErr("password", "Password Can't Be Empty!");
        }

        login(user).then(res => {
            if (res) {
                this.props.history.push('/profile')
            }
        })
    }

render() {

    let passwordErr = null,
      emailErr = null;

    for (let err of this.state.errors) {
      if (err.elm === "password") {
        passwordErr = err.msg;
      }
      if (err.elm === "email") {
        emailErr = err.msg;
      }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                    <form onSubmit={this.onSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Please Sign in!</h1>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email"
                            className="form-control"
                            name="email"
                            placeholder="Enter Email"
                            value={this.state.email}
                            onChange={this.onChange}
                            required/>
                            <small>{emailErr
                ? emailErr
                : ""}</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                            className="form-control"
                            name="password"
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={this.onChange}
                            required/>
                            <small>{passwordErr
                ? passwordErr
                : ""}</small>
                        </div>
                        <button type="submit" value="Submit"
                        className="btn btn-lg btn-primary btn-block">
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
} 
}

export default Login
