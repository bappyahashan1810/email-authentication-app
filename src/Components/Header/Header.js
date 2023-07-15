import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <Link className='p-2 btn btn-primary m-2' to='/'>Registration</Link>
            <Link className='p-2 btn btn-primary m-2' to='/login'>LogIn</Link>
        </div>
    );
};

export default Header;