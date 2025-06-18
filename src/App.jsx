import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import TaskDetails from './components/TaskDetails';

const App = () => {
  const [tasks, setTasks] = useState([]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage tasks={tasks} setTasks={setTasks} />} />
          <Route path="/add" element={<AddTask tasks={tasks} setTasks={setTasks} />} />
          <Route path="/edit/:id" element={<EditTask tasks={tasks} setTasks={setTasks} />} />
          <Route path="/task/:id" element={<TaskDetails tasks={tasks} />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
