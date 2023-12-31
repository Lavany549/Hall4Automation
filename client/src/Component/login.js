import React ,{useState} from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import Error from "./Error";
const Login=()=>{
   
    const[email,setemail]=useState('')
    const[password,setpassword]=useState('')

    const[loading, setloading]=useState(false)
    const[error, seterror]=useState()



    
    async function login(){
       
            const user={
                email,
                password
            }
            try {

                setloading(true)
                const result = await axios.post('/api/users/login', user);
                // console.log(response.data); // Assuming the data you want is in the response
                setloading(false);

                localStorage.setItem('currentUser',JSON.stringify(result));
               window.location.href='/services'


              } catch (error) {
                console.error(error.response.data); // Log the error response
                setloading(false)
                seterror(true)
              }
            // console.log(user)       
       
    }
    return(
        <>
       <div>
        {loading && (<Loader/>)}      
            <div className="row justify-content-center mt-5 md-5">
                <div className="col-md-5 parentContainer mt-5" style={{height:'50%'}}>
                <p style={{color:'red'}}>{error && (<Error message='Invalid Credentials'/>)}</p>
                    <div className="main bs" style={{height:'50%'}}>
                        <h2>Login</h2>
                        <input type="text" className="form-control" placeholder="IITK E-mail"
                        value={email} onChange={(e)=>{setemail(e.target.value)}}/>
                       
                        <input type="text" className="form-control" placeholder="Password"
                        value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
                      
                        <button className="btn btn-primary" onClick={login}>Login</button>
                        <p>Not registered?  
                        <Link to="/register" style={{ color: "Purple" }}>   Register  </Link>
                        here
                        </p>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}
export default Login; 
