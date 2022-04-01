import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { Todos, Subtask } from '../types'

type Props = { data: Todos }

const TodoBox = (props: Props) => {
    const [show, setShow] = useState(false)
    const [isCheck, setIsCheck] = useState(props.data?.status == 'completed')
    const [subtaskInput, setSubtaskInput] = useState('')
    const [subtasks, setSubtasks] = useState(props.data?.subtasks)

    const getCompletedSubtasks = (subtasks: Subtask[]) => {
        return subtasks.filter(s => s.status == 'completed').length
    }

    const addSubtask = async () => {
        try {
            const resposne = await fetch(`http://localhost:8000/api/v1/subtasks/${props.data.id}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ title: subtaskInput })
            })
            const resJson = await resposne.json()
            if (resJson.status == true) {
                setSubtasks([...subtasks, resJson.data])
                setSubtaskInput('')
            } else {
                alert('There was some errors, try again..')
            }
        } catch (e) {
            console.log(e)
            location.reload()
        }
    }

    const updateTodo = async (check: boolean) => {
        try {
            const resposne = await fetch(`http://localhost:8000/api/v1/todos/${props.data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ status: check ? 'pending' : 'completed' })
            })
            const resJson = await resposne.json()
            if (resJson.status == true) {
                setIsCheck(resJson.data.status == 'completed')
            } else {
                alert('There was some errors, try again..')
            }
        } catch (e) {

        }
    }

    return (
        <div className={styles.box__container + " my-4"}>
            <div className='d-flex'>
                <input
                    className={styles.todo__check + " form-check-input"}
                    type="checkbox"
                    defaultChecked={props.data.status ? props.data.status == 'completed' : false}
                    onChange={() => updateTodo(isCheck)}
                />
                <div className='ms-3'>
                    <span className={styles.todo__title} onClick={() => setShow(!show)}>
                        {props.data ? props.data.title : ''}
                    </span><br />
                    <span className={styles.todo__status}>
                        {props.data ? getCompletedSubtasks(props.data.subtasks) : 0} of {props.data ? props.data.subtasks.length : 0} completed
                    </span>
                </div>
                <div onClick={() => setShow(!show)} className={styles.todo__arrow + " ms-auto"}>
                    {show &&
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="bi bi-caret-up-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                        </svg>}
                    {!show &&
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="bi bi-caret-down-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>}
                </div>
            </div>
            {show && props.data && subtasks.map(subtask => <>
                <div className={styles.subtask__container}>
                    <input
                        className={styles.subtask__check + " form-check-input"}
                        type="checkbox"
                        defaultChecked={subtask.status ? subtask.status == 'completed' : false}
                    />
                    <div className='ms-3'>
                        <span className={styles.subtask__title}>{subtask.title}</span>
                    </div>
                </div>
            </>)}
            {show && <div className='mt-3'>
                <input
                    type="text"
                    className="form-control"
                    placeholder="What are the steps?"
                    value={subtaskInput}
                    onChange={(e) => setSubtaskInput(e.target.value)}
                />
                <button
                    className="btn btn-warning mt-2 w-100"
                    disabled={subtaskInput == ''}
                    onClick={() => { addSubtask() }}
                >New Step</button>
            </div>}
        </div>
    )
}

export default TodoBox