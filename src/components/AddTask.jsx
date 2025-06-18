import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTask = ({ tasks, setTasks }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    status: 'Pending',
    tags: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks([...tasks, { ...form, tags: form.tags.split(',').map(tag => tag.trim()) }]);
    navigate('/');
  };

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h2 className='text-3xl font-bold mb-5 text-pink-800'>Add New Task</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input className="border p-2 w-full" type="text" name="title" placeholder="Title" onChange={handleChange} required />

        <textarea className="border p-2 w-full" name="description" placeholder="Description" onChange={handleChange}  />

        <input className="border p-2 w-full" type="date" name="date" onChange={handleChange}  />

        <select className="border p-2 w-full" name="status" onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

       

        <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
