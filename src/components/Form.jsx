/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
import { useState, useEffect } from "react";
import Alert from "./Alert";
import usePatients from "../hooks/usePatients";


const Form = () => {

    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [email, setEmail] = useState('');
    const [admissionDate, setAdmissionDate] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [id, setId] = useState(null);

    const [alert, setAlert] = useState({});

    const {savePatient, patient} = usePatients();

    useEffect(() => {
        if(patient?.name) {
            setName(patient.name);
            setOwner(patient.owner);
            setEmail(patient.email);
            setAdmissionDate(new Date(patient.admissionDate).toLocaleDateString('en-CA'));
            setSymptoms(patient.symptoms);
            setId(patient._id);
        }
    }, [patient])

    const handleSubmit = evt => {
        evt.preventDefault();

        if([name, owner, email, admissionDate, symptoms].includes('')) {
            setAlert({
                msg: 'All fields are required',
                error: true
            });
            return;
        }

        savePatient({name, owner, email, admissionDate, symptoms, id});
        setAlert({
            msg: 'Patient Saved Successfully'
        });
        setName('');
        setOwner('');
        setEmail('');
        setAdmissionDate('');
        setSymptoms('');
        setId('');

    }

    const {msg} = alert;

    return (
        <>

            <h2 className="font-black text-3xl text-center">Patients Manager</h2>
            <p className="text-xl mt-5 mb-10 text-center">Add your patients and {' '}
                <span className="font-bold text-indigo-600">Manage them</span>
            </p>

            <form 
                className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
                onSubmit={handleSubmit}
            >
                <div className="mb-5">
                    <label 
                        htmlFor="name"
                        className="text-gray-700 uppercase font-bold"
                    >Pet&apos;s Name</label>
                    <input 
                        id="name"
                        type="text"
                        placeholder="Pet's Name"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={name}
                        onChange={evt => setName(evt.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label 
                        htmlFor="owner"
                        className="text-gray-700 uppercase font-bold"
                    >Owner&apos;s Name</label>
                    <input 
                        id="owner"
                        type="text"
                        placeholder="Owner's Name"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={owner}
                        onChange={evt => setOwner(evt.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label 
                        htmlFor="email"
                        className="text-gray-700 uppercase font-bold"
                    >Email</label>
                    <input 
                        id="email"
                        type="email"
                        placeholder="Owner's Email"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={evt => setEmail(evt.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label 
                        htmlFor="admissiondate"
                        className="text-gray-700 uppercase font-bold"
                    >Admission Date</label>
                    <input 
                        id="admissiondate"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={admissionDate}
                        onChange={evt => setAdmissionDate(evt.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label 
                        htmlFor="symptoms"
                        className="text-gray-700 uppercase font-bold"
                    >Symptoms</label>
                    <textarea 
                        id="symptoms"
                        placeholder="Describe the symptoms"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={symptoms}
                        onChange={evt => setSymptoms(evt.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    value={id ? 'Save Changes' : 'Add Patient'}
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                />
            </form>

            {msg && <Alert alert={alert} />}
        </>
    )
}

export default Form