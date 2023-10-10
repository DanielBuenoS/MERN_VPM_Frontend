import usePatients from "../hooks/usePatients";
import Patient from "./Patient";


const PatientsList = () => {

    const {patients} = usePatients();

    return (
        <>
            {patients.length ? 
            (
                <>
                    <h2 className="font-black text-3xl text-center">Patients List</h2>

                    <p className="text-xl mt-5 mb-10 text-center">Manage your patient {' '}
                    <span className="font-bold text-indigo-600">appointments</span>
                    </p>

                    {patients.map(patient => (
                        <Patient 
                            key={patient._id}
                            patient={patient}
                        />
                    ))}
                </>
            ) : 
            (
                <>
                    <h2 className="font-black text-3xl text-center">There aren&apos;t patients yet</h2>

                    <p className="text-xl mt-5 mb-10 text-center">Start adding a {' '}
                    <span className="font-bold text-indigo-600">patient</span>
                    </p>
                </>
                
            )}
        </>
    )
}

export default PatientsList