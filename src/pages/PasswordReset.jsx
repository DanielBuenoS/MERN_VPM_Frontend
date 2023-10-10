import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import axiosClient from "../config/axios";

const PasswordReset = () => {

    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState({});

    const handleSubmit = async evt => {
        evt.preventDefault();

        if(email === '') {
            setAlert({msg: 'Email required', error: true});
            return;
        }

        try {
            const {data} = await axiosClient.post('/vets/password-reset', {email});
            setAlert({msg: data.msg});
        } catch (error) {
            console.log(error.response)
            setAlert({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    const {msg} = alert;

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">Reset your <span className="text-black">Password </span></h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                
                {msg && <Alert 
                    alert={alert}
                />}
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Email
                        </label>
                        <input 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            type="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={evt => setEmail(evt.target.value)}
                        />

                    </div>

                    <input 
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                        type="submit"
                        value="Send Reset Link"
                    />
                </form>

                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link 
                    className="block text-center my-5 text-gray-500"
                    to="/">Have an account? Log in 
                    </Link>
                    <Link 
                    className="block text-center my-5 text-gray-500"
                    to="/signup">Don&apos;t have an account? Sign up 
                    </Link>
                </nav>

            </div>   
        </>
    )
}

export default PasswordReset;