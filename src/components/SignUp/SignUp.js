
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGoogle} from '@fortawesome/free-brands-svg-icons'
import { getAuth, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import './SignUp.css'

const auth = getAuth()
const SignUp = () => {
    const [emailError, setEmailError] = useState('')
    const provider = new GoogleAuthProvider()
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)
    const {createUser} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSignUp = event=>{
        event.preventDefault()
        const form =event.target
        const name = form.name.value;
        const email =form.email.value;
        const password=form.password.value;
        const confirm =form.confirm.value;
      

        if(password.length<8){
            setError("password should be at least 8 character or more")
        }
        else{
            setError('')
        }
        if(password!==confirm){
            setError("password didn't match.Please try again.")
            return;
        }
        createUser(email,password)
        .then(result =>{
            const user = result.user;
            form.reset()
            updateUserProfile(name)
            setSuccess(true)
            console.log(user);
            navigate('/')
        })
        .catch(error=>{
            console.error(error)
            setEmailError(error.message)
        })
        
        
    }

    const updateUserProfile = name=>{
        updateProfile(auth.currentUser, {
            displayName: name
        })
      
    }

    const handleGoogleSignUp = ()=>{
        signInWithPopup(auth, provider)
        .then(result =>{
            const user = result.user;
            console.log(user);
            navigate('/')
        })
    }
    return (
        <div className='signUp-container'>
            <form onSubmit={handleSignUp}>
                <h1>Sign up</h1>
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' placeholder='Enter your name' required />
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' placeholder='Enter your email' required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' placeholder='Enter your password' required />
                </div>
                <div className="form-control">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name='confirm' placeholder='Enter your confirm password' required />
                </div>
                {
                    emailError && <p className='text-red-500'>This email already used. Try to new email!</p>
                }
                <input className='signUp-button' type="submit" value="sign Up" />
            </form>
            <button onClick={handleGoogleSignUp} className="btn btn-outline btn-danger google-button"><FontAwesomeIcon className='google-icon' icon={faGoogle}></FontAwesomeIcon> Sign up with Google</button>
           
            <p className='error-message'>{error}</p>
           {success&& <p className='text-success fw-bolder'> User  created successful!!</p>}
            <p>Already have an account? Please<Link to='/login'><button className="btn btn-link">Log in</button></Link></p>
            

        </div>
    );
};

export default SignUp;