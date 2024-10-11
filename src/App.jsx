import { useEffect, useState } from 'react';
import './App.css';
import { TodoProvider } from './contexts/TodoContext';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage on component mount
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('todos'));
    if (items && items.length > 0) {
      setTodos(items);
    }
  }, []);

  // Store todos in localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add a new todo
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo, completed: false }, ...prev]);
  };

  // Update an existing todo
  const updatedTodo = (id, updatedTodo) => {
    setTodos((prev) =>
      prev.map((eachVal) =>
        eachVal.id === id ? { ...eachVal, ...updatedTodo } : eachVal
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Toggle todo completion
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
      )
    );
  };

  return (
    <TodoProvider value={{ todos, addTodo, updatedTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/* Loop through and render TodoItem components */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem item={todo} /> {/* Make sure to pass the item prop correctly */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
