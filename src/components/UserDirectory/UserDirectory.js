import React, { useState, useEffect } from 'react';
import './UserDirectory.css';

const UserDirectory = () => {
    // Estado para guardar la lista de usuarios
    const [users, setUsers] = useState([]);
    // Estado para saber si los datos están cargando
    const [loading, setLoading] = useState(true);
    // Estado para guardar un posible error
    const [error, setError] = useState(null);
    
    // useEffect para realizar efectos secundarios
    useEffect(() => {
        // Usamos la API 'fetch' del navegador para hacer la petición
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('La respuesta de la red no fue satisfactoria');
            }
            return response.json();
        })
        .then(data => {
            setUsers(data);
            setError(null);
        })
        .catch(error => {
            setError(error.message);
            setUsers([]);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);
    // Aquí mostraremos la UI basada en los estados de loading, error y users
    
    return (
        <div className="user-directory">
        <h2>Directorio de Usuarios</h2>
        
        {/* 1. Si está cargando, muestra un mensaje */}
        {loading && <p>Cargando los usuarios</p>}

        {/* 2. Si hay un error, muestra un mensaje */}
        {error && <p className="error-message">Error: {error}</p>}

        {/* 3. Si no hay error y no está cargando, muestra la lista */}
        {!loading && !error &&(
            <ul>
                {users.map(user => (
                    <li key={user.id} className='user-card'>
                        <h3>{user.name}</h3>
                        <p>📧 {user.email}</p>
                        <p>🌐 {user.website}</p>
                    </li>
                ))}
            </ul>
        )}
        </div>
    );
};

export default UserDirectory;