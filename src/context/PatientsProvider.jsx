/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import axiosClient from "../config/axios";
import useAuth from "../hooks/useAuth";

const PatientsContext = createContext();

const PatientsProvider = ({children}) => {

    const [patients, setPatients] = useState([]);
    const [patient, setPatient] = useState({});
    const {auth} = useAuth();

    useEffect(() => {
        const getPatients = async () => {
            try {
                const token = localStorage.getItem('token');
                if(!token) return;

                const config = {
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    } 
                }

                const {data} = await axiosClient('/patients', config);
                setPatients(data)
                
            } catch (error) {
                console.log(error)
            }
        }
        getPatients();
    }, [patients, auth])

    const savePatient = async patient => {

        const token = localStorage.getItem('token');
        const config = {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            } 
        }

        if(patient.id) {
            try {
                const {data} = axiosClient.put(`/patients/${patient.id}`, patient, config);
                console.log(data)
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const {data} = await axiosClient.post('/patients', patient, config);
                const {createdAt, updatedAt, __v, ...savedPatient} = data;
                setPatients(savedPatient, ...patients);
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
    }

    const setEdition = patient => {
        setPatient(patient);
    }

    const deletePatient = async id => {
        const deleteConfirm = confirm('Do you want to delete this patient?');
        
        if(deleteConfirm) {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    } 
                }

                const {data} = await axiosClient.delete(`/patients/${id}`, config);
                
            } catch (error) {
                console.log(error);
            }
        }
    }

    return(
        <PatientsContext.Provider
            value={{
                patients,
                savePatient,
                setEdition,
                patient,
                deletePatient
            }}
        >
            {children}
        </PatientsContext.Provider>
    )

}

export {
    PatientsProvider
}

export default PatientsContext;
