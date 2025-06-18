import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditTask = ({ tasks, setTasks }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasks[id];
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    status: 'Pending',
    tags: ''
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description,
        date: task.date,
        status: task.status,
        tags: task.tags.join(', ')
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = { ...form, tags: form.tags.split(',').map(tag => tag.trim()) };
    const newTasks = [...tasks];
    newTasks[id] = updatedTask;
    setTasks(newTasks);
    navigate('/');
  };

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h2 className='text-3xl font-bold mb-5'>Edit Task</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input className="border p-2 w-full" type="text" name="title" value={form.title} onChange={handleChange} required />

        <textarea className="border p-2 w-full" name="description" value={form.description} onChange={handleChange}  />

        <input className="border p-2 w-full" type="date" name="date" value={form.date} onChange={handleChange} required />

        <select className="border p-2 w-full" name="status" value={form.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <input className="border p-2 w-full" type="text" name="tags" value={form.tags} onChange={handleChange} />

        <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;
