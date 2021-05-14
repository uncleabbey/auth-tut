import { useState, useEffect } from 'react';
import Todo from '../components/Todo';
import '../syles/Todos.css';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTodos([...data]);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div>
      <h1>Todos</h1>
      <div className="todo-container">
        {todos.map((todo) => (
          <Todo todo={todo} key={todo.id} />
        ))}
      </div>
    </div>
  );
};

export default Todos;
