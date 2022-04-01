import { Todo } from './todo.entity'

export const todoMock: Todo = {
    id: 1,
    title: 'test todo 1',
    status: 'pending',
    createdAt: new Date('2022-03-28T19:03:30.154Z'),
    subtasks: [
        {
            id: 3,
            todoId: 1,
            title: 'subtask03',
            status: 'completed',
            createdAt: new Date('2022-03-29T14:40:47.064Z'),
            todo: null
        }
    ]
}

export const todoMocks: Todo[] = [
    todoMock,
    {
        id: 2,
        title: 'test todo 2',
        status: 'pending',
        createdAt: new Date('2022-03-29T14:40:11.895Z'),
        subtasks: [
            {
                id: 3,
                todoId: 2,
                title: 'subtask03',
                status: 'completed',
                createdAt: new Date('2022-03-29T14:40:47.064Z'),
                todo: null
            }
        ]
    }
]