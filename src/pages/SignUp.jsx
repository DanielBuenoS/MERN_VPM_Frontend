import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../config/axios";
import Alert from "../components/Alert";

const SignUp = () => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const [alert, setAlert] = useState({});

    const handleSubmit = async evt => {
        evt.preventDefault();

        console.log('Submitting...')

        if([name, email, password, repeatPassword].includes('')) {
            setAlert({msg: "All fields are required", error: true});
            return;
        }

        if(password !== repeatPassword) {
            setAlert({msg: "Passwords doesn't match", error: true});
            return;
        }

        if(password.length < 6) {
            setAlert({msg: "Password must be greater than 6 characters long", error: true});
            return;
        }

        setAlert({});

        // Create user in the API
        try {
            await axiosClient.post('/vets', {name, email, password})
            setAlert({
                msg: 'Account created succesfully, please verify your email',
                error: false
            });
        } catch (error) {
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
                <h1 className="text-indigo-600 font-black text-6xl">Create your account and Manage your <span className="text-black">Patients </span></h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                
                {msg && <Alert 
                    alert={alert}
                />}
                <form
                    onSubmit = {handleSubmit}
                >
                     
                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Nombre
                        </label>
                        <input 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            type="text"
                            placeholder="Jhon Doe"
                            value={name}
                            onChange={evt => setName(evt.target.value)}
                        />

                    </div>

                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Email
                        </label>
                        <input 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            type="email"
                            placeholder="jhondoe@email.com"
                            value={email}
                            onChange={evt => setEmail(evt.target.value)}
                        />

                    </div>

                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Password
                        </label>
                        <input 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            type="password"
                            placeholder="Your Password"
                            value={password}
                            onChange={evt => setPassword(evt.target.value)}
                        />

                    </div> 

                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Repeat Password
                        </label>
                        <input 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            type="password"
                            placeholder="Repeat your Password"
                            value={repeatPassword}
                            onChange={evt => setRepeatPassword(evt.target.value)}
                        />

                    </div>                   


                    <input 
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                        type="submit"
                        value="Sign Up"
                    />
                </form>
                
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link 
                    className="block text-center my-5 text-gray-500"
                    to="/">Have an account? Log in 
                    </Link>
                    <Link 
                    className="block text-center my-5 text-gray-500"
                    to="/passwordreset">Forgot Password? 
                    </Link>
                </nav>

            </div>

            
        </>
    )
}

export default SignUp;