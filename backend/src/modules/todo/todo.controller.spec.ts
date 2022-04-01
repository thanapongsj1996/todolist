import { TodoController } from './todo.controller'
import { TodoService } from './todo.service'
import { successResponse, failedResponse } from '../../jsonResponse'
import { Todo } from './todo.entity'
import { todoMock, todoMocks } from './todo.mock'
import { subtaskMock } from './subtask.mock'
import { Subtask } from './subtask.entity'

describe('TodoController', () => {
    let todoService: TodoService
    let todoController: TodoController
    const tmpErrorWord = 'there are some errors'

    beforeEach(async () => {
        todoService = new TodoService(null, null)
        todoController = new TodoController(todoService)
    })

    describe('getTodos', () => {
        it('should return success response with an array of todos', async () => {
            const resultPromise: Promise<Todo[]> = new Promise((resolve, reject) => {
                resolve(todoMocks)
            })
            jest.spyOn(todoService, 'getAll').mockImplementation(() => resultPromise)
            const expected = successResponse(await resultPromise)
            const got = await todoController.getTodos()

            expect(got).toStrictEqual(expected)
        })
        it('should return failed resposne with message', async () => {
            const resultPromise: Promise<Todo[]> = new Promise((resolve, reject) => {
                resolve(null)
            })
            jest.spyOn(todoService, 'getAll').mockImplementation(() => resultPromise)
            const expected = failedResponse(tmpErrorWord)
            const got = await todoController.getTodos()

            expect(got).toStrictEqual(expected)
        })
    })

    describe('createTodo', () => {
        it('should return success response with created todo', async () => {
            const resultPromise: Promise<Todo> = new Promise((resolve, reject) => {
                resolve(todoMock)
            })
            jest.spyOn(todoService, 'create').mockImplementation(() => resultPromise)
            const expected = successResponse(await resultPromise)
            const got = await todoController.createTodo('test todo 1')

            expect(got).toStrictEqual(expected)
        })
        it('should return failed resposne with message', async () => {
            const resultPromise: Promise<Todo> = new Promise((resolve, reject) => {
                resolve(null)
            })
            jest.spyOn(todoService, 'create').mockImplementation(() => resultPromise)
            const expected = failedResponse(tmpErrorWord)
            const got = await todoController.createTodo('test todo 1')

            expect(got).toStrictEqual(expected)
        })
    })

    describe('updateTodo', () => {
        it('should return success response with updated todo', async () => {
            const resultPromise: Promise<Todo> = new Promise((resolve, reject) => {
                resolve(todoMock)
            })
            jest.spyOn(todoService, 'update').mockImplementation(() => resultPromise)
            jest.spyOn(todoService, 'completeSubtasks').mockImplementation(() => null)
            jest.spyOn(todoService, 'getTodoById').mockImplementation(() => resultPromise)
            const expected = successResponse(await resultPromise)
            const gotPending = await todoController.updateTodo(1, 'pending')
            const gotCompleted = await todoController.updateTodo(1, 'completed')

            expect(gotPending).toStrictEqual(expected)
            expect(gotCompleted).toStrictEqual(expected)
        })
        it('should return failed resposne with message', async () => {
            const resultPromise: Promise<Todo> = new Promise((resolve, reject) => {
                resolve(null)
            })
            jest.spyOn(todoService, 'update').mockImplementation(() => resultPromise)
            const expected = failedResponse(tmpErrorWord)
            const got = await todoController.updateTodo(1, 'pending')

            expect(got).toStrictEqual(expected)
        })
    })

    describe('createSubtask', () => {
        it('should return success response with created subtask', async () => {
            const resultPromise: Promise<Subtask> = new Promise((resolve, reject) => {
                resolve(subtaskMock)
            })
            jest.spyOn(todoService, 'createSubtask').mockImplementation(() => resultPromise)
            const expected = successResponse(await resultPromise)
            const got = await todoController.createSubtask(1, 'test subtask')

            expect(got).toStrictEqual(expected)
        })
        it('should return failed resposne with message', async () => {
            const resultPromise: Promise<any> = new Promise((resolve, reject) => {
                resolve(null)
            })
            jest.spyOn(todoService, 'createSubtask').mockImplementation(() => resultPromise)
            const expected = failedResponse(tmpErrorWord)
            const got = await todoController.createSubtask(1, 'test subtask')

            expect(got).toStrictEqual(expected)
        })
    })

    describe('updateSubtask', () => {
        it('should return success response with updated subtask', async () => {
            const resultPromise: Promise<Subtask> = new Promise((resolve, reject) => {
                resolve(subtaskMock)
            })
            const TodosResultPromise: Promise<Todo> = new Promise((resolve, reject) => {
                resolve(todoMock)
            })
            jest.spyOn(todoService, 'updateSubtask').mockImplementation(() => resultPromise)
            jest.spyOn(todoService, 'update').mockImplementation(() => TodosResultPromise)
            const expected = successResponse(await resultPromise)
            const got = await todoController.updateSubtask(1, 1, 'pending')

            expect(got).toStrictEqual(expected)
        })
        it('should return failed resposne with message', async () => {
            const resultPromise: Promise<any> = new Promise((resolve, reject) => {
                resolve(null)
            })
            const TodosResultPromise: Promise<Todo> = new Promise((resolve, reject) => {
                resolve(todoMock)
            })
            jest.spyOn(todoService, 'updateSubtask').mockImplementation(() => resultPromise)
            jest.spyOn(todoService, 'update').mockImplementation(() => TodosResultPromise)
            const expected = failedResponse(tmpErrorWord)
            const got = await todoController.updateSubtask(1, 1, 'pending')

            expect(got).toStrictEqual(expected)
        })
    })
})