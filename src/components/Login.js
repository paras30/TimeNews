import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: "" })
    let history = useHistory();
    const handleSubmit = async (e) => {
        

        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password})
          });
         const json = await response.json()
         console.log(json);
         if (json.success){
             // save the auth token and redirect
             localStorage.setItem('token', json.authtoken);
             props.showAlert("Logged In Successfully","success")
             history.push("/");
             

         }
         else{
            props.showAlert("Invalid Details","danger")
         }

    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <>
    
        <div className="container mt-5 my-3">
            <h2 style={{  color: props.mode === 'dark'?'white':'black'}}>Login To Continue With TimeNEWS</h2>
            <form onSubmit={handleSubmit} style={{  color: props.mode === 'dark'?'white':'black'}}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email}  onChange={onChange} id="email" name='email' aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange}  id="password" name='password' />
                </div>

                <button type="submit" className={`btn btn-outline-${props.mode === 'dark'?'primary':'dark'}`}  >Submit</button>
            </form>
            
            </div>
            <div className="container">
            <h5 style={{  color: props.mode === 'dark'?'white':'black'}}>*If You Are New In App So First Go To SignUp button and SignUp YourSelf </h5></div>

           
        </>
    )
}

export default Login