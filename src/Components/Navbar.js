import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Link, useLocation } from "react-router-dom"
import NoteContext from '../Context/notes/noteContext';

function Navbar() {
    const context = useContext(NoteContext);
    const {name} = context;
    console.log(name);
    let location = useLocation();  //useLocation gives the location of the url we r in
    useEffect(() => {
    }, [location]);
    let history = useHistory();
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        history.push('/login');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token')?<form className="d-flex">
                            {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                            {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                            <Link className="btn btn-success mx-1" to='/login'  role="button">Login</Link>
                            <Link className="btn btn-primary mx-1" to='/signup' role="button">SignUp</Link>
                        </form>: <div className='d-flex'><p style={{"color":"white","margin":"auto 10px"}}>{name}</p><button className='btn btn-primary' onClick={handleLogout} >Logout</button></div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
