import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Login = (props) => {

    const host = "https://stark-cove-74055.herokuapp.com";
    const [credentials, setcredentials] = useState({ email: "", password: "" });
    const history = useHistory(); //to redirect
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = `${host}/api/auth/login`;

        const response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

        const json = await response.json();
        if (json.success) {
            //Redirect
            localStorage.setItem('token', json.authToken);
            history.push('/');  //to redirect to '/
            props.showAlert("Successfully LoggedIn","success");
        } else {
            props.showAlert("Invalid Credentials","danger");
        }
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className='container mt-5'>
            <h2>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit} action='/login'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" value={credentials.email} onChange={onChange} name='email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
