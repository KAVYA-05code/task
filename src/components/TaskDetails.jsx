import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TaskDetails = ({ tasks }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasks[id];

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h2 className='text-3xl font-bold mb-5'>Task Details</h2>
      <p><strong>Title:</strong> {task.title}</p>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Date:</strong> {task.date}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Tags:</strong> {task.tags.join(', ')}</p>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate('/')}>Back</button>
    </div>
  );
};

export default TaskDetails;
