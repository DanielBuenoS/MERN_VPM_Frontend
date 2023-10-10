/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alert from "../components/Alert";
import axiosClient from "../config/axios";

const NewPassword = () => {

    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({});
    const [validToken, setValidToken] = useState(false);
    const [modifiedPassword, setModifiedPassword] = useState(false);
    
    const params = useParams();
    const {token} = params;

    useEffect(() => {
        const verifyToken = async () => {
            try {
                await axiosClient(`/vets/password-reset/${token}`);
                setAlert({
                    msg: 'Enter your new password'
                });
                setValidToken(true);
            } catch (error) {
                setAlert({
                    msg: 'There was an error with the link',
                    error: true
                })
            }
        }
        verifyToken();
    }, []);

    const {msg} = alert;

    const handleSubmit = async evt => {
        evt.preventDefault();

        if(password.length < 6) {
            setAlert({
                msg: 'Password must be greater than 6 characters long',
                error: true
            })
            return;
        }

        try {
            const {data} = await axiosClient.post(`/vets/password-reset/${token}`, {password});
            console.log(data)
            setAlert({
                msg: data.msg 
            });

            setModifiedPassword(true);

        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">Reset your <span className="text-black">Password </span></h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                
                {msg && <Alert 
                    alert={alert}
                />}

                {validToken && (
                    <> 
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="my-5">
                                <label
                                    className="uppercase text-gray-600 block text-xl font-bold"
                                >
                                    New Password
                                </label>
                                <input 
                                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                    type="password"
                                    placeholder="Your Password"
                                    value={password}
                                    onChange={evt => setPassword(evt.target.value)}
                                />

                                <input 
                                    className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                                    type="submit"
                                    value="Save New Password"
                                />
                            </div>
                        </form>

                        <Link 
                            className="block text-center my-5 text-gray-500"
                            to="/">Log in 
                        </Link>

                    </>
                )}

                {modifiedPassword && 
                    <Link 
                        className="block text-center my-5 text-gray-500"
                        to="/"
                    >Log in 
                    </Link>
                }

            </div>
        </>
    )
}

export default NewPassword;