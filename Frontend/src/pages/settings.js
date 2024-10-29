import { Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../context/userContext';
import InfoInput from "../components/infoInput";
import { axiosRequest } from '../libs/apiUtils';

export default function Settings() {
    const { user, updateUser } = useContext(UserContext);
    const [infoUserMore, setInfoUserMore] = useState(null);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axiosRequest({ method: 'GET', url: `${apiUrl}/api/users/${user.email}`, headers: { 'Authorization': `Bearer ${user.token}` }, setStateFunction: setInfoUserMore });
    }, []);

    const submitSettings = async (values) => {
        const response = await axiosRequest({ method: 'PUT', url: `${apiUrl}/api/users/${user._id}`, data: values, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` }});
        if (response) {
            updateUser(response);
            alert('Informations mises à jour avec succès');
            navigate('/parametres', { replace: true });
        } else {
            alert("Échec de la mise à jour");
        }
    };

    if (!infoUserMore) {
        return <div className="text-white">Chargement des informations...</div>;
    }

    return (
        <div className='w-full h-full'>
            <Formik
                initialValues={{
                    firstname: infoUserMore.firstname || '',
                    lastname: infoUserMore.lastname || '',
                    email: infoUserMore.email || '',
                    currentPassword: '',
                    newPassword: '',
                }}
                onSubmit={submitSettings}
                validationSchema={Yup.object({
                    firstname: Yup.string().required('Champ requis'),
                    lastname: Yup.string().required('Champ requis'),
                    email: Yup.string().email('Adresse e-mail invalide').required('Champ requis'),
                    currentPassword: Yup.string().min(8, 'Le mot de passe doit comporter au moins 8 caractères'),
                    newPassword: Yup.string().min(8, 'Le nouveau mot de passe doit comporter au moins 8 caractères'),
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
                                        { name: 'currentPassword', label: 'Mot de passe actuel', type: 'password' },
                                        { name: 'newPassword', label: 'Nouveau mot de passe', type: 'password' },
                                    ]}
                                />
                            </div>
                            <button className="mt-3 w-full p-3 bg-pink-500 text-white rounded hover:bg-pink-700 transition duration-200 ease-in-out" type="submit" disabled={isSubmitting}>
                                Mettre à jour
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
