import React, {useEffect} from 'react'
import TodoList from './Todo/TodoList';
import Context from './context'
import AddTodo from './Todo/AddTodo'
import Loader from './Loader'
import Modal from './Modal/Modal'

function App() {
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  // useState всегда возвращает массив из двух элементов
  // 1-й элемент - состояние, по умолчанию равно дефолтному значению
  // 2-й элемент - функция, позволяющая изменять состояние

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(todos => {
        setTimeout(() => {
          setTodos(todos)
          setLoading(false)
        }, 1000);
      })
  }, [])

  function toggleTodo(id) {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    }))
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false
        }
      ])
    )
  }

  return (
    <Context.Provider value={{ removeTodo: removeTodo }}>
      <div className='wrapper'>
        <h1>To-do List</h1>
        <Modal></Modal>
        <AddTodo onCreate={addTodo}></AddTodo>

        {loading && <Loader></Loader>}

        {todos.length ? (<TodoList todos={todos} onToggle={toggleTodo} />) : 
        loading ? null : (<p>No todos!</p>)}

        
      </div>
  </Context.Provider>
  )
}

export default App;
