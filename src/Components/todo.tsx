import { useState, useEffect } from 'react';

function Todo() {
    const [todos, setTodos] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [editIndex, setEditIndex] = useState<number | null>(null);

    // Load todos from local storage on initial render
    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    // Save todos to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = () => {
        if (inputValue.trim() !== '') {
            setTodos([...todos, inputValue]);
            setInputValue('');
        }
    };

    const editTodo = (index: number) => {
        setEditIndex(index);
        setInputValue(todos[index]);
    };

    const updateTodo = (index: number) => {
        const updatedTodos = [...todos];
        updatedTodos[index] = inputValue;
        setTodos(updatedTodos);
        setEditIndex(null);
        setInputValue(''); // Reset input value after update
    };

    const deleteTodo = (index: number) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
        setEditIndex(null);
    };

    const toggleTodo = (index: number) => {
        const updatedTodos = [...todos];
        if (updatedTodos[index].startsWith('~~')) {
            updatedTodos[index] = updatedTodos[index].substring(2, updatedTodos[index].length - 2);
        } else {
            updatedTodos[index] = `~~${updatedTodos[index]}~~`;
        }
        setTodos(updatedTodos);
    };

    return (
        <div className="p-4 mt-32">
            <h1 className="text-2xl font-bold mb-4">Todo App</h1>
            <div className="flex mb-4">
                <input
                    type="text"
                    className="w-full rounded-l py-2 px-3 border"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter a new todo..."
                />
                <button
                    className="bg-blue-500 whitespace-nowrap hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r"
                    onClick={addTodo}
                >
                    Add Todo
                </button>
            </div>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index} className="flex justify-between items-center border-b py-2 px-1">
                        {editIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    className="flex-1 px-2"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                                <div>
                                    <button
                                        className="text-green-500 mr-2"
                                        onClick={() => updateTodo(index)}
                                    >
                                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>

                                    </button>
                                    <button className="text-gray-500" onClick={() => setEditIndex(null)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div style={{ textDecoration: todo.startsWith('~~') ? 'line-through' : 'none', color: todo.startsWith('~~') ? 'gray' : 'inherit' }}>
                                    {todo.startsWith('~~') ? todo.substring(2, todo.length - 2) : todo}
                                </div>
                                <div>
                                    <button className="text-yellow-500 mr-2" onClick={() => editTodo(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                        </svg>

                                    </button>
                                    <button className="text-red-500" onClick={() => deleteTodo(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>

                                    </button>
                                    <button className="text-green-500 ml-2" onClick={() => toggleTodo(index)}>
                                        {todo.startsWith('~~') ? (
                                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-400">
                                       <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                     </svg>
                                     
                                        
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                        )}
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todo;
