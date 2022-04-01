import { TodoController } from './todo.controller'
import { TodoService } from './todo.service'
import { successResponse, failedResponse } from '../../jsonResponse'
import { Todo } from './todo.entity'
import { todoMock, todoMocks } from './todo.mock'

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
            const expected = successResponse(await resultPromise)
            const got = await todoController.updateTodo(1, 'pending')

            expect(got).toStrictEqual(expected)
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
})