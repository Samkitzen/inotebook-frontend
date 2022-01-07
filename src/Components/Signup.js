import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
const Signup = (props) => {
    const host = "https://stark-cove-74055.herokuapp.com";
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "" });
    const history = useHistory(); //to redirect

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = `${host}/api/auth/createuser`;
        const response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
        const json = await response.json();
        //Redirect
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            history.push('/');  //to redirect to '/
            props.showAlert("Account Created SuccessFully","success")
        } else {
            props.showAlert("Some Error Occured!","danger");
        }
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div className='container mt-5'>
            <h2>SignUp to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" onChange={onChange} value={credentials.name} name='name' id="name" aria-describedby="namesas" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} value={credentials.email} name='email' id="email" aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credentials.password} name='password' id="password" required minLength={5} />
                </div>

                <button disabled={credentials.password.length<5} type="submit" className="btn btn-primary">SignUp</button>
            </form>
        </div>
    )
}

export default Signup
