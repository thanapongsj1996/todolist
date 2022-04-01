import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Jumbotron from '../components/Jumbotron'
import TodoBox from '../components/TodoBox'
import styles from '../styles/Home.module.css'
import { Todos } from '../types'
import { callAPI } from '../helpers/callAPI'

const Home: NextPage = () => {

  const [todos, setTodos] = useState([] as Todos[])
  const [todoInput, setTodoInput] = useState('')

  useEffect(() => {
    getTodos()
  }, [])

  const getTodos = async () => {
    try {
      const response = await callAPI(
        `${process.env.NEXT_PUBLIC_TODO_API_ENDPOINT}/todos`,
        'GET',
      )
      const todosJson = await response.json()
      if (todosJson && todosJson.status == true) {
        setTodos(todosJson.data)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const addTodo = async () => {
    try {
      const response = await callAPI(
        `${process.env.NEXT_PUBLIC_TODO_API_ENDPOINT}/todos`,
        'POST',
        { title: todoInput }
      )
      const resJson = await response.json()
      if (resJson.status == true) {
        alert('Your todo is added')
        location.reload()
      } else {
        alert('There was some errors, try again..')
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Jumbotron />
      <div className="container d-flex flex-column py-5">
        <div className="row w-100 px-0 mx-0">
          <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <div className={styles.box__container}>
              <div className="input-group input-group-lg">
                <input
                  type="text"
                  className="form-control"
                  placeholder="What to do?"
                  value={todoInput}
                  onChange={(e) => setTodoInput(e.target.value)}
                />

              </div>
              <button
                className="btn btn-lg btn-primary mt-2 w-100"
                disabled={todoInput == ''}
                onClick={() => { addTodo() }}
              >Add new todo</button>
            </div>
          </div>
        </div>
        <div className="row w-100 px-0 mx-0 mt-3">
          <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            {todos.map(todo => <TodoBox key={todo.id} data={todo} />)}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
