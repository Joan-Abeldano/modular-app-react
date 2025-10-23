import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Aprender React', completed: false },
    { id: 2, text: 'Construir una App', completed: false },
    { id: 3, text: 'Modularizar componentes', completed: false }
  ]);

  const [inputValue, setInputValue] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
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
              onClick={() => toggleTask(task.id)}
            >
              {task.text}
            </span>
            <div className="task-buttons">
              <button 
                className="complete-btn"
                onClick={() => toggleTask(task.id)}
              >
                {task.completed ? '↶' : '✓'}
              </button>
              <button 
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
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