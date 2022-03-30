import { Test, TestingModule } from '@nestjs/testing'
import { SubtaskController } from './subtask.controller'
import { SubtaskService } from './subtask.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Subtask } from './subtask.entity'
import { Repository } from 'typeorm'
import { subtaskMock } from './subtask.mock'

describe('SubtaskService', () => {
    let service: SubtaskService
    let repository: Repository<Subtask>
    let failedService: SubtaskService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SubtaskController],
            providers: [
                SubtaskService,
                {
                    provide: getRepositoryToken(Subtask),
                    useValue: {
                        save: jest.fn(() => {
                            return subtaskMock
                        }),
                        findOne: jest.fn(() => {
                            return subtaskMock
                        }),
                        merge: jest.fn()
                    }
                }
            ]
        }).compile()

        const failedModule: TestingModule = await Test.createTestingModule({
            controllers: [SubtaskController],
            providers: [
                SubtaskService,
                {
                    provide: getRepositoryToken(Subtask),
                    useValue: {
                        save: jest.fn(() => {
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

        service = module.get<SubtaskService>(SubtaskService)
        repository = module.get<Repository<Subtask>>(getRepositoryToken(Subtask))
        failedService = failedModule.get<SubtaskService>(SubtaskService)
    })

    it('service should be defined', () => {
        expect(service).toBeDefined()
    })
    it('repository should be defined', () => {
        expect(repository).toBeDefined()
    })
    it('create should return mock data', async () => {
        const subtask = await service.create(subtaskMock)
        expect(subtask).toBe(subtaskMock)
    })
    it('update should return mock data', async () => {
        const subtask = await service.update(1, 1, subtaskMock)
        expect(subtask).toBe(subtaskMock)
    })
    it('update failed should return null', async () => {
        const subtask = await failedService.update(1, 1, subtaskMock)
        expect(subtask).toBe(null)
    })
})
