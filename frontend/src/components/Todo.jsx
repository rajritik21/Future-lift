import React, { useState, useEffect } from 'react';

const Todo = ({ user }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // In a real app, we would fetch this from the API
    const savedTodos = localStorage.getItem('jobApplicationTodos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jobApplicationTodos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    const todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full h-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Application Tasks</h2>
      
      <form onSubmit={addTodo} className="mb-4 flex">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a task..."
          className="flex-grow px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          type="submit"
          className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 text-sm rounded-r-md transition-colors duration-300"
        >
          Add
        </button>
      </form>
      
      <div className="flex mb-3 border-b border-gray-200 pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`mr-2 px-2 py-1 text-xs rounded ${
            filter === 'all'
              ? 'bg-primary-100 text-primary-800'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`mr-2 px-2 py-1 text-xs rounded ${
            filter === 'active'
              ? 'bg-primary-100 text-primary-800'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-2 py-1 text-xs rounded ${
            filter === 'completed'
              ? 'bg-primary-100 text-primary-800'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Completed
        </button>
      </div>
      
      <div className="max-h-64 overflow-y-auto">
        <ul className="space-y-2">
          {filteredTodos.length === 0 ? (
            <li className="text-gray-500 text-center py-4 text-sm">No tasks found</li>
          ) : (
            filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between bg-gray-50 p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                  />
                  <span
                    className={`ml-2 text-sm ${
                      todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
      
      {todos.length > 0 && (
        <div className="mt-3 text-xs text-gray-600">
          {todos.filter(todo => todo.completed).length} completed out of {todos.length} tasks
        </div>
      )}
    </div>
  );
};

export default Todo; 