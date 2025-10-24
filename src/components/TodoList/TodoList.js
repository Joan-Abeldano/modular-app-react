import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, query, orderBy, onSnapshot, addDoc, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore"; 
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // 1. Creamos una referencia a nuestra colección "tasks" en Firestore
    const collectionRef = collection(db, "tasks");

    // 2. Creamos una consulta (query) para ordenar las tareas por fecha
    const q = query(collectionRef, orderBy("createdAt", "asc"));

    // 3. onSnapshot es el ¡ESCUCHADOR EN TIEMPO REAL!
    // Se dispara una vez al inicio y luego CADA VEZ que los datos cambian
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newTasks = [];
      querySnapshot.forEach((doc) => {
        newTasks.push({ 
          ...doc.data(), 
          id: doc.id // El ID del documento es importante
        });
      });
      setTasks(newTasks); // Actualizamos nuestro estado de React
    });

    // Esta función de limpieza se ejecuta cuando el componente se "desmonta"
    // Evita fugas de memoria
    return () => unsubscribe();

  }, []); 

  const handleAddTask = async (e) => { // La hacemos 'async'
    e.preventDefault();
    if (inputValue.trim() === '') return;
  
    // ¡En lugar de solo 'setTasks', escribimos en la BD!
    await addDoc(collection(db, "tasks"), {
      text: inputValue,
      isComplete: false,
      createdAt: serverTimestamp() // Marca de tiempo de Firebase
    });
  
    setInputValue('');
    // NOTA: No necesitamos 'setTasks' aquí.
    // ¡'onSnapshot' detectará el nuevo documento y actualizará el estado por nosotros!
  };

  const toggleTask = async (task) => { // Pasamos el objeto 'task' entero
    // 1. Creamos una referencia al documento específico por su ID
    const taskRef = doc(db, "tasks", task.id);
  
    // 2. Actualizamos ese documento
    await updateDoc(taskRef, {
      isComplete: !task.isComplete // Invertimos el valor
    });
    // De nuevo, ¡onSnapshot se encarga de actualizar la UI!
  };

  const deleteTask = async (idToDelete) => {
    // 1. Creamos una referencia al documento
    const taskRef = doc(db, "tasks", idToDelete);
  
    // 2. Borramos el documento
    await deleteDoc(taskRef);
    // ¡onSnapshot se encarga del resto!
  };

  return (
    <div className="todo-list-container">
      <h2>Lista de Tareas</h2>

      <form onSubmit={handleAddTask} className="add-task-form">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Añade una nueva tarea..."
        />
        <button type="submit">Añadir</button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span 
              className="task-text"
              onClick={() => toggleTask(task)}
            >
              {task.text}
            </span>
            <div className="task-buttons">
              <button 
                className="complete-btn"
                onClick={() => toggleTask(task)}
              >
                {task.completed ? '↶' : '✓'}
              </button>
              <button 
                className="delete-btn"
                onClick={() => deleteTask(task)}
              >
                🗑
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;