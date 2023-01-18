import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGoogle} from '@fortawesome/free-brands-svg-icons'
import { getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithPopup } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import './Login.css'
const auth = getAuth()
const Login = () => {
    const provider = new GoogleAuthProvider()
    const {signIn} = useContext(AuthContext)
    const [forgotEmail, setForgotEmail] = useState('')
    const [wrongPass, setWrongPass] = useState('')
    const navigate = useNavigate()
    let location = useLocation()
    let from = location.state?.from?.pathname || "/";

    const handleSignIn=event=>{
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email,password)
        .then(result=>{
            const user = result.user;
            console.log(user);
          
            form.reset()
            navigate(from, { replace: true })

        })
        .catch(error=>{
            console.error(error)
            setWrongPass(error.message)
        })
    }

    const handleBlurEmail = event =>{
        const email = event.target.value;
        setForgotEmail(email)
    }
    const handleForgotPassword = ()=>{
        if(!forgotEmail){
            alert('please enter your email in input field.')
            return;
        }
        sendPasswordResetEmail(auth,forgotEmail)
        .then(()=>{
            alert('password reset email sent your email')
        })
        .catch(error=>{
            console.error(error)
        })
    }
    const handleGoogleLogIn = ()=>{
        signInWithPopup(auth,provider)
        .then(result =>{
            const user = result.user;
            console.log(user);
            navigate('/')

        })
    }
    return (
        <div className='login-container'>
           <form onSubmit={handleSignIn}>
                <h1>Login</h1>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input onBlur={handleBlurEmail} type="email" name='email' placeholder='Enter your email' required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' placeholder='Enter your password' required />
                   
                </div>
                {
                    wrongPass && <p className='text-red-500'>Wrong password. please try again!</p>
                }
                <input className='login-button' type="submit" value="Login" />
                
            </form>
            <button onClick={handleGoogleLogIn} className="btn btn-outline btn-danger google-button"><FontAwesomeIcon className='google-icon' icon={faGoogle}></FontAwesomeIcon> Login with Google</button>
            <button onClick={handleForgotPassword} type="button" class="btn btn-link">Forgot password?</button>
            <p>Don't have an account?<Link to='/signup'><button className="btn btn-link">Create a New account.</button></Link></p>
        </div>
    );
};

export default Login;