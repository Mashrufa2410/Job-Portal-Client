import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import auth from '../../firebase/firebase.init'; // Default import
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Create a new user with email and password
    const createUser = async (email, password) => {
        setLoading(true);
        try {
            return await createUserWithEmailAndPassword(auth, email, password);
        } finally {
            setLoading(false);
        }
    };

    // Sign in user with email and password
    const signInUser = async (email, password) => {
        setLoading(true);
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } finally {
            setLoading(false);
        }
    };

    // Sign in user with Google
    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            return await signInWithPopup(auth, googleProvider);
        } finally {
            setLoading(false);
        }
    };

    // Sign out the current user
    const signOutUser = async () => {
        setLoading(true);
        try {
            return await signOut(auth);
        } finally {
            setLoading(false);
        }
    };

    // Track authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            console.log('Auth state changed:', currentUser?.email);
            if (currentUser?.email) {
                const user = { email: currentUser?.email };
                try {
                    const res = await axios.post('http://localhost:5000/jwt', user, { withCredentials: true });
                    console.log('login token', res.data);
                } catch (error) {
                    console.error('Error getting JWT token:', error);
                }
            } else {
                try {
                    const res = await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
                    console.log('logout', res.data);
                } catch (error) {
                    console.error('Error logging out:', error);
                }
            }
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signInWithGoogle,
        signOutUser,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
