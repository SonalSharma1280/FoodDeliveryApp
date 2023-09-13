import React, { useState } from 'react'//here dont forget to import useState as well
import { Link } from 'react-router-dom'//link tag couldn't be used without importing it

export default function SignUp() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })//useState is use to set users credentials means what user will write in name,password and other fields that will pass to the database
    const handlesubmit = async (e) => {
        e.preventDefault();//synthetic event?
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            //it is to stringify data which is in json format
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        });//here the name,email,password,location is the credentials we used in the backend and the values we are using is the credentials to set values used in this page
        const json = await response.json()
        console.log(json)
        
        if(!json.success){
            alert("Enter valid credentials")
        }

    }
    const onChange = (event) => {//onChange is to enable changing values into input boxes.
        setCredentials({ ...credentials, [event.target.name]: event.target.value })

    }
    return (
        <>
            <div className="container">
                <form onSubmit={handlesubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">UserName</label>
                        <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input type="text" className="form-control" name="geolocation" value={credentials.geolocation} onChange={onChange} id="exampleInputAddress1" />
                    </div>

                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className="m-3 btn btn-danger">Already a User</Link>
                </form>
            </div>
        </>
    )
}
