/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect, createContext } from "react";
import axiosClient from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const userAuth = async () => {
            const token = localStorage.getItem('token');
            
            if(!token) {
                setLoading(false);
                return;
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }    
            }

            try {
                const {data} = await axiosClient('/vets/profile', config);
                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }

            setLoading(false);
        }
        userAuth();
    }, []);

    const logOut = () => {
        localStorage.removeItem('token');
        setAuth({});
    }

    const updateProfile = async profileInfo => {
        const token = localStorage.getItem('token');
            
        if(!token) {
            setLoading(false);
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }    
        }

        try {
            const url = `/vets/profile/${profileInfo._id}`
            const {data} = await axiosClient.put(url, profileInfo, config);
            return {
                msg: 'Profile updated successfully'
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const updatePassword = async (passwordInfo) => {
        const token = localStorage.getItem('token');
            
        if(!token) {
            setLoading(false);
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }    
        }

        try {
            const url = '/vets/update-password'
            const {data} = await axiosClient.put(url, passwordInfo, config);
            console.log(data)
            return {
                msg: data.msg
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                logOut,
                updateProfile,
                updatePassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}

export {
    AuthProvider
}

export default AuthContext;