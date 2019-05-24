import React, {Component} from 'react';
import {register} from './UserFunctions';
import console from 'console';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            errors: [],
            pwdState: null
        };

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});

        this.setState({pwdState: "weak"});
        if(e.target.value.length > 8) {
            this.setState({pwdState: "medium"});
        } else if(e.target.value.length > 12) {
            this.setState({pwdState: "strong"});
        }
    }

    openPopup(e){
        console.log("Hello WOrld!");
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
        alert('A name was submitted: ');
        e.preventDefault()
        console.log(this.state);

        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        }

        if(this.state.first_name === ""){
            this.showValidationErr("first_name", "First Name Can't Be Empty!");
        }

        if(this.state.last_name === ""){
            this.showValidationErr("last_name", "Last Name Can't Be Empty!");
        }

        if(this.state.email === ""){
            this.showValidationErr("email", "Email Can't Be Empty!");
        }

        if(this.state.password === ""){
            this.showValidationErr("password", "Password Can't Be Empty!");
        }

        register(user).then(res => {
            if (res) {
                this.props.history.push('/login');
            }
        })
    }

render() {
    
    let 
    first_nameErr = null,
    last_nameErr = null,
      passwordErr = null,
      emailErr = null;

    for (let err of this.state.errors) {
      if (err.elm === "first_name") {
        first_nameErr = err.msg;
      }
      if (err.elm === "last_name") {
        last_nameErr = err.msg;
      }
      if (err.elm === "password") {
        passwordErr = err.msg;
      }
      if (err.elm === "email") {
        emailErr = err.msg;
      }
    }
    let   
    pwdWeak = false,
    pwdMedium = false,
    pwdStrong = false;

    if (this.state.pwdState === "weak") {
      pwdWeak = true;
    } else if (this.state.pwdState === "medium") {
      pwdWeak = true;
      pwdMedium = true;
    } else if (this.state.pwdState === "strong") {
      pwdWeak = true;
      pwdMedium = true;
      pwdStrong = true;
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                    <form onSubmit={this.onSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Please Sign in!</h1>
                        <div className="form-group">
                            <label htmlFor="first_name">First Name</label>
                            <input type="text"
                            className="form-control"
                            name="first_name"
                            placeholder="First Name"
                            value={this.state.first_name}
                            onChange={this.onChange}
                            required/>
                            <small>{first_nameErr
                ? first_nameErr
                : ""}</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="last_name">Last Name</label>
                            <input type="text"
                            className="form-control"
                            name="last_name"
                            placeholder="Last Name"
                            value={this.state.last_name}
                            onChange={this.onChange}
                            required/>
                            <small>{last_nameErr
                ? last_nameErr
                : ""}</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email"
                            className="form-control"
                            name="email"
                            placeholder="Enter Email"
                            value={this.state.email}
                            onChange={this.onChange}
                            required />
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
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
} 
}

export default Register
