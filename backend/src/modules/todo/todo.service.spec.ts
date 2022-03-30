import { Test, TestingModule } from '@nestjs/testing'
import { TodoController } from './todo.controller'
import { TodoService } from './todo.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Todo } from './todo.entity'
import { Repository } from 'typeorm'
import { todoMock, todoMocks } from './todo.mock'

describe('TodoService', () => {
    let service: TodoService
    let repository: Repository<Todo>
    let failedService: TodoService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TodoController],
            providers: [
                TodoService,
                {
                    provide: getRepositoryToken(Todo),
                    useValue: {
                        save: jest.fn(() => todoMock),
                        find: jest.fn(() => todoMocks),
                        findOne: jest.fn(() => todoMock),
                        merge: jest.fn(),
                        createQueryBuilder: jest.fn(() => ({
                            leftJoinAndSelect: jest.fn().mockReturnThis(),
                            orderBy: jest.fn().mockReturnThis(),
                            getMany: jest.fn(() => todoMocks)
                        }))
                    }
                }
            ]
        }).compile()

        const failedModule: TestingModule = await Test.createTestingModule({
            controllers: [TodoController],
            providers: [
                TodoService,
                {
                    provide: getRepositoryToken(Todo),
                    useValue: {
                        save: jest.fn(() => {
                            return null
                        }),
                        find: jest.fn(() => {
                            return null
                        }),
                        findOne: jest.fn(() => {
                            return null
                        }),
                        merge: jest.fn()
                    }
                }
            ]
        }).compile()

        service = module.get<TodoService>(TodoService)
        repository = module.get<Repository<Todo>>(getRepositoryToken(Todo))
        failedService = failedModule.get<TodoService>(TodoService)
    })

    it('service should be defined', () => {
        expect(service).toBeDefined()
    })
    it('repository should be defined', () => {
        expect(repository).toBeDefined()
    })
    it('getAll should return correct data', async () => {
        const todos = await service.getAll()
        expect(todos).toBe(todoMocks)
    })
    it('create should return correct data', async () => {
        const todo = await service.create(todoMock)
        expect(todo).toBe(todoMock)
    })
    it('update should return correct data', async () => {
        const todo = await service.update(1, todoMock)
        expect(todo).toBe(todoMock)
    })
    it('update failed should return null', async () => {
        const todo = await failedService.update(1, todoMock)
        expect(todo).toBe(null)
    })
})
