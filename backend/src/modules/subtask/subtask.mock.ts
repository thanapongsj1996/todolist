import { Subtask } from './subtask.entity'

export const subtaskMock: Subtask = {
    id: 1,
    todoId: 1,
    title: 'test subtask 1',
    status: 'pending',
    createdAt: new Date('2022-03-28T19:03:30.154Z'),
    todo: null
}
