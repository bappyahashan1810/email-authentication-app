import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import app from '../../firebase/firebase.init';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Registion = () => {
    const [useError, setUseError] = useState('');
    const [success, setSuccess] = useState(false);
    const handleSubmit = (event) => {
        setSuccess(false);

        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);
        if (!/(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}/.test(password)) {
            setUseError('Please Provide 8 characters length,2 letters in Upper Case,1 Special Character numerals and 3 letters in Lower Case');
            return;
        }
        setUseError('');
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                emailverfication();
                setSuccess(true);
                updateUserProfile(name);
                form.reset();
            })
            .catch(error => {
                console.log('error : ', error);
            })
    }
    const updateUserProfile = name => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
            .then(() => {
                alert('Updated profile');
            })
            .catch(error => console.log(error))
    }
    const emailverfication = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                alert('Send you Email code,Please Check your Email');
            })
    }
    return (
        <div className='w-50 mx-auto'>
            <h4 className='text-primary'>Please Register!</h4>
            <Form onSubmit={handleSubmit}>
                {success && <h6 className='text-success'>Successful Registration</h6>}
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name='name' placeholder="Enter Name" required />

                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" required />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required />
                    <p className='text-danger'><small>{useError}</small></p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Registration
                </Button>
            </Form>
            <p><small>Have an account?please<Link to='/login'>LogIn</Link></small></p>

        </div>
    );
};

export default Registion;