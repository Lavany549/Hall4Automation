import React ,{useState} from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import '../css/register.css';
import Success from "./Success";
import Loader from "./Loader";
import Error from "./Error";
const Register=()=>{
    const[name,setname]=useState('')
    const[email,setemail]=useState('')
    const[rollnum,setrollnum]=useState('')
    const[password,setpassword]=useState('')
    const[cpassword,setcpassword]=useState('')

    const[loading, setloading]=useState(false)
    const[error, seterror]=useState()
    const[success,setsuccess]=useState()

    async function register(){
        const emailRegex = /^[a-zA-Z0-9._-]+@iitk\.ac\.in$/;
        if (!emailRegex.test(email)) {
            alert('Invalid email format. Please use a valid IITK email address.');
            return;
        }
        if(password===cpassword)
        {

            try {
                setloading(true)
                const checkUser = await axios.post('/api/users/checkuser', { rollnum, email });
                setloading(false)
                setsuccess(true)
                if (checkUser.data.exists) {
                    // User with the same roll number or email already exists
                    alert('User with the same roll number or email already exists');
                    return;
                }
                else{
                    const user={
                        name,
                        email,
                        rollnum,
                        password,
                        cpassword
                    }
                    try {
                        setloading(true)
                        const response = await axios.post('/api/users/register', user);
                        // console.log(response.data); // Assuming the data you want is in the response
                        setloading(false)
                        setsuccess(true)
        
                        setname('')
                        setemail('')
                        setpassword('')
                        setcpassword('')
                        setrollnum('')
                      } catch (error) {
                        console.log(error); // Log the error response
                        setloading(false);
                        seterror(true);
        
                      }
                }
            } catch (error) {
                console.log(error); // Log the error response
                setloading(false);
                seterror(true);
            }
            

        }
        else{
            alert('Passwords didnt match!!')
        }
       
    }
    return(
        <>
       <div>
        {loading && (<Loader/>)}
        
        
            <div className="row justify-content-center mt-5 md-5">
                <div className="col-md-5 parentContainer mt-5 ">
                {error && (<Error/>)}
                <p style={{color:'green'}}>{success && (<Success message='Registration Succesful!!'/>)}</p>
                        
                    <div className="main bs ">
                        <h2>Register</h2>
                        <input type="text" className="form-control" placeholder="Name" 
                        value={name} onChange={(e)=>{setname(e.target.value)}}/>
                        <input type="text" className="form-control" placeholder="IITK E-mail"
                        value={email} onChange={(e)=>{setemail(e.target.value)}}/>
                        <input type="text" className="form-control" placeholder="Roll Number"
                        value={rollnum} onChange={(e)=>{setrollnum(e.target.value)}}/>
                        <input type="text" className="form-control" placeholder="Password"
                        value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
                        <input type="text" className="form-control" placeholder="Confirm Password"
                        value={cpassword} onChange={(e)=>{setcpassword(e.target.value)}}/>
                      <button className="btn btn-primary" onClick={register}>Register</button>
                        
                        <p>Already registered? Go to  
                        <Link to="/login" style={{color:'Purple'}}>  Login </Link>
                        </p>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}
export default Register; 
