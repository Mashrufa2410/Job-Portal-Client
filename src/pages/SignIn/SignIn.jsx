import Lottie from 'lottie-react';
import React, { useContext } from 'react';
import loginLottieJSON from '../../assets/lottie/login.json';
import AuthContext from '../../context/AuthContext/AuthContext';
import SocialLogin from '../shared/SocialLogin';
import { useLocation, useNavigate } from 'react-router-dom';

const SignIn = () => {
    const { signInUser } = useContext(AuthContext); // Fixed the typo here
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from || '/'; // Fallback to '/' if from is not defined

    const handleSignIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(result => {
                navigate(from); // If 'from' is not defined, it'll navigate to '/'
            })
            .catch(error => {
                console.log(error); // You can handle the error more gracefully in production
            });
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left w-96">
                    <Lottie animationData={loginLottieJSON} />
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className="ml-8 mt-4 text-5xl font-bold">Login now!</h1>
                    <form onSubmit={handleSignIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default SignIn;
