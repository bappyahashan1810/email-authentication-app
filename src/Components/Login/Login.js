import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import app from '../../firebase/firebase.init';
import { Link } from 'react-router-dom';



const auth = getAuth(app);


const Login = () => {
    const [userError, setUserError] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const handleLogin = (event) => {
        setSuccess(false);
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
                setSuccess(true);
            })

            .catch(error => {
                console.error('error: ', error);
                setUserError(error.message);

            })


    }
    const handlerGetEmail = (event) => {
        const email = event.target.value;
        setUserEmail(email);
    }
    const handleForgetPassword = () => {
        if (!userEmail) {
            alert('Enter your email');
            return;
        }
        sendPasswordResetEmail(auth, userEmail)
            .then(() => {
                alert('Reset password, check your email');
            })
            .catch((error) => {
                console.error('error:', error);
            })
    }
    return (
        <div className='w-50 mx-auto'>
            <Form onSubmit={handleLogin}>
                <h3 className='text-primary'>Please LogIn</h3>
                {
                    success && <p className='text-success'>SuccessFully LogIn</p>
                }
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onBlur={handlerGetEmail} type="email" name='email' placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    LogIn
                </Button>
            </Form>
            <p><small>Are you new user?please <Link to='/'>Register</Link></small></p>
            <p className='text-danger'><small>{userError}</small></p>
            <p><small>Forget password?<button onClick={handleForgetPassword} type="button" class="btn btn-link">Reset Password</button></small></p>
        </div>
    );
};

export default Login;