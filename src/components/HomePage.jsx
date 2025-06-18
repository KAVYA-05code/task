import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ tasks, setTasks }) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const navigate = useNavigate();

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div className='max-w-5xl mx-auto p-6'>
      <h2 className='text-3xl font-bold mb-5 text-center text-violet-900'>TASK MANAGEMENT</h2>
      <div className='flex justify-between mb-4'>
        <input
          type="text"
          placeholder="Search by title"
          className="border p-2 w-2/3 rounded"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <button
          className="bg-yellow-400 px-4 py-2 rounded ml-4"
          onClick={() => navigate('/add')}
        >
          ADD TASK +
        </button>
      </div>

      <table className="w-full border shadow-md rounded ">
        <thead>
          <tr className='bg-gray-100 text-orange-500'>
            <th className="border p-2">Title</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.length === 0 ? (
            <tr>
              <td colSpan="4" className="border p-2 text-center">No tasks found</td>
            </tr>
          ) : (
            currentTasks.map((task, index) => {
              const realIndex = tasks.indexOf(task);
              return (
                <tr key={index}>
                  <td className="border p-2">{task.title}</td>
                  <td className="border p-2">{task.date}</td>
                  <td className="border p-2">{task.status}</td>
                  <td className="border p-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 mr-2 rounded"
                      onClick={() => navigate(`/edit/${realIndex}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleDelete(realIndex)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      <div className='flex justify-center mt-4'>
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
          <button
            key={pageNum}
            className={`mx-1 px-3 py-1 rounded border ${currentPage === pageNum ? 'bg-purple-400 text-white' : 'bg-white'}`}
            onClick={() => handlePageChange(pageNum)}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
