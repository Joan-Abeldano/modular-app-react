import React, { useContext } from 'react';
import './App.css';
import Header from './components/Header/Header.js';
import UserDirectory from './components/UserDirectory/UserDirectory.js';
import TodoList from './components/TodoList/TodoList.js';
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher.js';
import ThemeContext from './context/ThemeContext.js';

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`App ${theme}`}>
      <Header themeSwitcher={<ThemeSwitcher />}/>
      <main>
        <TodoList />
        <UserDirectory />
      </main>
    </div>
  );
}

export default App;