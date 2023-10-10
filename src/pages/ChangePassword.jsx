import { useState } from "react";
import AdminNav from "../components/AdminNav"
import Alert from "../components/Alert";
import useAuth from "../hooks/useAuth";

const ChangePassword = () => {

    const {updatePassword} = useAuth();

    const [alert, setAlert] = useState({});
    const [password, setPassword] = useState({
        current_password : '',
        new_password : ''
    });

    const handleSubmit = async evt => {
        evt.preventDefault();
        if(Object.values(password).some(field => field === '')) {
            setAlert({
                msg: 'All fields are required',
                error: true
            });

            return;
        }

        if(password.new_password.length < 6) {
            setAlert({
                msg: 'Password must be greater than 6 characters long',
                error: true
            });
            return;
        }

        const result = await updatePassword(password);

        setAlert(result);
    }

    const {msg} = alert;

  return (
    <>
        <AdminNav />

        <h2 className="font-black text-3xl text-center mt-10">Change Password</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modify here your {' '} 
            <span className=" text-indigo-600 font-bold">Password</span>
        </p>

        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

                {msg && <Alert alert={alert} />}

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Current Password</label>
                        <input
                            type="password"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="current_password"
                            placeholder="Type your current password"
                            onChange={evt => setPassword({
                                ...password,
                                [evt.target.name] : evt.target.value
                            })}
                        />
                    </div>

                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">New Password</label>
                        <input
                            type="password"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="new_password"
                            placeholder="Type your new password"
                            onChange={evt => setPassword({
                                ...password,
                                [evt.target.name] : evt.target.value
                            })}
                        />
                    </div>

                    <input 
                        type="submit"
                        value="Update Password"
                        className="bg-indigo-700 hover:bg-indigo-800 hover:cursor-pointer px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
                    />
                </form>
            </div>
        </div>
    </>
  )
}

export default ChangePassword