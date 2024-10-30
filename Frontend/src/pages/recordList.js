import React, { useState, useEffect, useContext } from 'react';
import { axiosRequest } from '../libs/apiUtils';
import { UserContext } from '../context/userContext';

export default function ListeEnregistrements() {
    const [enregistrements, setEnregistrements] = useState([]), [texte, setTexte] = useState("");
    const [modeEdition, setModeEdition] = useState(null), [texteEdition, setTexteEdition] = useState("");
    const { user } = useContext(UserContext);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axiosRequest({ method: 'GET', url: `${apiUrl}/api/records/`, headers: { "Authorization": `${user.access ? `Bearer ${user.access}` : ''}` }, setStateFunction: setEnregistrements });
    }, []);

    const ajouterEnregistrement = async () => {
        if (!texte.trim()) return;
        const newRecord = await axiosRequest({ method: 'POST', url: `${apiUrl}/api/records/`, headers: { "Authorization": `${user.access ? `Bearer ${user.access}` : ''}` }, data: { text: texte }, setStateFunction: (data) => setEnregistrements([...enregistrements, data])});
        if (newRecord) setTexte("");
    };

    const sauvegarderEdition = async (id) => {
        if (!texteEdition.trim()) return;
        const updatedRecord = await axiosRequest({ method: 'PUT', url: `${apiUrl}/api/records/${id}/`, headers: { "Authorization": `${user.access ? `Bearer ${user.access}` : ''}` }, data: { text: texteEdition }});
        if (updatedRecord) {
            setEnregistrements(enregistrements.map(enr => enr.id === id ? { ...enr, text: texteEdition } : enr));
            setModeEdition(null);
            setTexteEdition("");
        }
    };

    const supprimerEnregistrement = async (id) => {
        const deleted = await axiosRequest({ method: 'DELETE', url: `${apiUrl}/api/records/${id}/`, headers: { "Authorization": `${user.access ? `Bearer ${user.access}` : ''}` }});
        if (deleted) setEnregistrements(enregistrements.filter(enr => enr.id !== id));
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-gray-900 py-10">
            <h1 className="text-5xl font-extrabold mb-10 text-blue-400">Enregistrements</h1>
            <div className="w-full max-w-2xl flex gap-3 mb-8">
                <input
                    type="text"
                    value={texte}
                    onChange={e => setTexte(e.target.value)}
                    placeholder="Ajouter un enregistrement..."
                    className="w-full px-5 py-3 border border-gray-600 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-white placeholder-gray-400"
                />
                <button onClick={ajouterEnregistrement} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Ajouter
                </button>
            </div>
            <ul className="w-full max-w-2xl space-y-4">
                {enregistrements.map(enr => (
                    <li key={enr.id} className="flex flex-col bg-gray-800 shadow-md rounded-lg p-4 border border-gray-700 transition hover:shadow-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex-1 text-gray-300 text-lg font-medium">{enr.text}</div>
                            <div className="flex space-x-2">
                                <button onClick={() => { setModeEdition(enr.id); setTexteEdition(enr.text); }} className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow hover:bg-yellow-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-400">
                                    Éditer
                                </button>
                                <button onClick={() => supprimerEnregistrement(enr.id)} className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400">
                                    Supprimer
                                </button>
                            </div>
                        </div>
                        <div className="text-sm text-gray-500 mt-2">
                            Par {enr.created_by} le {enr.created_at}
                        </div>
                        {modeEdition === enr.id && (
                            <div className="mt-4">
                                <input
                                    type="text"
                                    value={texteEdition}
                                    onChange={e => setTexteEdition(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white mb-3"
                                />
                                <div className="flex space-x-3">
                                    <button onClick={() => sauvegarderEdition(enr.id)} className="flex-1 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
                                        Enregistrer
                                    </button>
                                    <button onClick={() => setModeEdition(null)} className="flex-1 px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
                                        Annuler
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
