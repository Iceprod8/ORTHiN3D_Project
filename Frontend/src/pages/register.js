import { Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../context/userContext';
import InfoInput from "../components/infoInput";
import { axiosRequest } from '../libs/apiUtils';

export default function Register() {
    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext);
    const apiUrl = process.env.REACT_APP_API_URL;

    const submitRegister = async (values) => {
        try {
            const response = await axiosRequest({ method: 'POST', url: `${apiUrl}/api/auth/register`, headers: { 'Content-Type': 'application/json' }, data: JSON.stringify(values) });
            if (response) {
                updateUser(response);
                navigate('/', { replace: true });
            } else {
                const errorData = await response.json();
                console.error(`Échec de l'inscription:`, errorData);
                alert(`Échec de l'inscription: ${errorData.message || "Erreur inconnue"}`);
            }
        } catch (error) {
            console.error('Erreur réseau:', error);
            alert(`Erreur réseau: ${error.message}`);
        }
    }

    return (
        <div className='w-full h-full'>
            <Formik
                initialValues={{
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                }}
                onSubmit={submitRegister}
                validationSchema={Yup.object({
                    firstname: Yup.string().required('Champ requis'),
                    lastname: Yup.string().required('Champ requis'),
                    email: Yup.string().email('Adresse e-mail invalide').required('Champ requis'),
                    password: Yup.string().min(8, 'Le mot de passe doit comporter au moins 8 caractères').required('Champ requis'),
                })}>
                {({ isSubmitting }) => (
                    <Form className="flex flex-col items-center justify-center min-h-screen bg-[#151515] text-white">
                        <div className='w-full max-w-lg p-8 space-y-4 bg-[#292929] rounded-lg shadow-lg'>
                            <div className="grid grid-cols-2 gap-4">
                                <InfoInput
                                    fields={[
                                        { name: 'firstname', label: 'Prénom', type: 'text' },
                                        { name: 'lastname', label: 'Nom', type: 'text' },
                                        { name: 'email', label: 'E-mail', type: 'email' },
                                        { name: 'password', label: 'Mot de passe', type: 'password' },
                                    ]}
                                />
                            </div>
                            <button className="mt-3 w-full p-3 bg-pink-500 text-white rounded hover:bg-pink-700 transition duration-200 ease-in-out" type="submit" disabled={isSubmitting}>
                                S'inscrire
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}