import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecordList = () => {
    const [records, setRecords] = useState([]), [text, setText] = useState("");
    const [editMode, setEditMode] = useState(null), [editText, setEditText] = useState("");

    useEffect(() => { 
        axios.get('http://127.0.0.1:8000/api/records/')
            .then(res => setRecords(res.data))
            .catch(err => console.error("Erreur de récupération", err));
    }, []);

    const addRecord = async () => { 
        if (text.trim() === "") return;
        try { 
            const res = await axios.post('http://127.0.0.1:8000/api/records/', { text });
            setRecords([...records, res.data]); 
            setText(""); 
        } catch (err) { 
            console.error("Erreur d'ajout", err); 
        }
    };

    const saveEdit = async (id) => {
        if (editText.trim() === "") return;
        try {
            await axios.put(`http://127.0.0.1:8000/api/records/${id}/`, { text: editText });
            setRecords(records.map(record => record.id === id ? { ...record, text: editText } : record));
            setEditMode(null); 
            setEditText("");
        } catch (err) {
            console.error("Erreur de mise à jour", err);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
            <h1 className="text-4xl font-extrabold mb-8 text-gray-800">Records</h1>
            <div className="w-full max-w-lg flex gap-2 mb-6">
                <input 
                    type="text" 
                    value={text} 
                    onChange={e => setText(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add a new record..."
                />
                <button 
                    onClick={addRecord} 
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add
                </button>
            </div>
            <ul className="w-full max-w-lg space-y-4">
                {records.map(record => (
                    <li key={record.id} className="flex items-center bg-white shadow-lg rounded-lg p-4 space-x-4">
                        {editMode === record.id ? (
                            <>
                                <input 
                                    type="text" 
                                    value={editText} 
                                    onChange={e => setEditText(e.target.value)} 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button 
                                    onClick={() => saveEdit(record.id)} 
                                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    Save
                                </button>
                                <button 
                                    onClick={() => setEditMode(null)} 
                                    className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <span className="flex-1 text-gray-700">{record.text}</span>
                                <button 
                                    onClick={() => { setEditMode(record.id); setEditText(record.text); }} 
                                    className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                >
                                    Edit
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecordList;
