import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore"; 
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Active tasks
    const qActive = query(collection(db, "tasks"), orderBy("createdAt", "asc"));
    const unsubActive = onSnapshot(qActive, (qs) => {
      const newTasks = [];
      qs.forEach(d => newTasks.push({ ...d.data(), id: d.id }));
      setTasks(newTasks);
    });

    // Completed tasks
    const qCompleted = query(collection(db, "completedTasks"), orderBy("completedAt", "desc"));
    const unsubCompleted = onSnapshot(qCompleted, (qs) => {
      const newTasks = [];
      qs.forEach(d => newTasks.push({ ...d.data(), id: d.id }));
      setCompletedTasks(newTasks);
    });

    // Deleted tasks
    const qDeleted = query(collection(db, "deletedTasks"), orderBy("deletedAt", "desc"));
    const unsubDeleted = onSnapshot(qDeleted, (qs) => {
      const newTasks = [];
      qs.forEach(d => newTasks.push({ ...d.data(), id: d.id }));
      setDeletedTasks(newTasks);
    });

    return () => {
      unsubActive();
      unsubCompleted();
      unsubDeleted();
    };
  }, []); 

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    await addDoc(collection(db, "tasks"), {
      text: inputValue,
      isComplete: false,
      createdAt: serverTimestamp()
    });

    setInputValue('');
  };

  const completeTask = async (task) => {
    await addDoc(collection(db, "completedTasks"), {
      text: task.text,
      originalId: task.id,
      createdAt: task.createdAt || serverTimestamp(),
      completedAt: serverTimestamp()
    });
    await deleteDoc(doc(db, "tasks", task.id));
  };

  const uncompleteTask = async (task) => {
    await addDoc(collection(db, "tasks"), {
      text: task.text,
      isComplete: false,
      createdAt: task.createdAt || serverTimestamp()
    });
    await deleteDoc(doc(db, "completedTasks", task.id));
  };

  const deleteActiveTask = async (task) => {
    await addDoc(collection(db, "deletedTasks"), {
      text: task.text,
      originalId: task.id,
      createdAt: task.createdAt || serverTimestamp(),
      deletedAt: serverTimestamp()
    });
    await deleteDoc(doc(db, "tasks", task.id));
  };

  const deleteCompletedTask = async (task) => {
    await addDoc(collection(db, "deletedTasks"), {
      text: task.text,
      originalId: task.id,
      createdAt: task.createdAt || null,
      completedAt: task.completedAt || null,
      deletedAt: serverTimestamp()
    });
    await deleteDoc(doc(db, "completedTasks", task.id));
  };

  const formatTimestamp = (ts) => {
    if (!ts) return '';
    try {
      if (ts.toDate) return ts.toDate().toLocaleString();
      if (ts instanceof Date) return ts.toLocaleString();
      return String(ts);
    } catch {
      return String(ts);
    }
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

      <section>
        <h3>Activas</h3>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <span className="task-text">{task.text}</span>
              <small>{task.createdAt ? formatTimestamp(task.createdAt) : ''}</small>
              <div className="task-buttons">
                <button className="complete-btn" onClick={() => completeTask(task)}>✓</button>
                <button className="delete-btn" onClick={() => deleteActiveTask(task)}>🗑</button>
              </div>
            </li>
          ))}
          {tasks.length === 0 && <li>No hay tareas activas.</li>}
        </ul>
      </section>

      <section>
        <h3>Completadas</h3>
        <ul>
          {completedTasks.map(task => (
            <li key={task.id} className="completed">
              <span className="task-text">{task.text}</span>
              <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:4}}>
                <small>Completado: {formatTimestamp(task.completedAt)}</small>
                {task.createdAt && <small>Creada: {formatTimestamp(task.createdAt)}</small>}
              </div>
              <div className="task-buttons">
                <button className="complete-btn" onClick={() => uncompleteTask(task)}>↶</button>
                <button className="delete-btn" onClick={() => deleteCompletedTask(task)}>🗑</button>
              </div>
            </li>
          ))}
          {completedTasks.length === 0 && <li>No hay tareas completadas.</li>}
        </ul>
      </section>

      <section>
        <h3>Eliminadas</h3>
        <ul>
          {deletedTasks.map(task => (
            <li key={task.id}>
              <span className="task-text">{task.text}</span>
              <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:4}}>
                {task.deletedAt && <small>Eliminado: {formatTimestamp(task.deletedAt)}</small>}
                {task.completedAt && <small>Completado: {formatTimestamp(task.completedAt)}</small>}
                {task.createdAt && <small>Creada: {formatTimestamp(task.createdAt)}</small>}
              </div>
            </li>
          ))}
          {deletedTasks.length === 0 && <li>No hay tareas eliminadas.</li>}
        </ul>
      </section>
    </div>
  );
};

export default TodoList;