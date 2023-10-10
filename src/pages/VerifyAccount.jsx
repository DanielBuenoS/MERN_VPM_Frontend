/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../config/axios";
import Alert from "../components/Alert";

const VerifyAccount = () => {

    const [verifiedAccount, setVerifiedAccount] = useState(false);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({});

    const params = useParams();
    const {id} = params;

    useEffect(() => {
        const verifyAccount = async () => {
            try {
                const {data} = await axiosClient(`/vets/verification/${id}`);
                setVerifiedAccount(true);
                setAlert({ 
                    msg: data.msg
                });
            } catch (error) {
                setAlert({
                    msg: error.response.data.msg,
                    error: true
                });
            }
            setLoading(false);
        }
        verifyAccount();
    }, []);

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">Verify your account and start managing your <span className="text-black">Patients </span></h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {!loading && <Alert 
                    alert = {alert}
                />}

                {verifiedAccount && (
                    <Link 
                        className="block text-center my-5 text-gray-500"
                        to="/">Log in 
                    </Link>
                )}
            </div>    
        </>
    )
}

export default VerifyAccount;