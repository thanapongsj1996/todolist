import { SubtaskController } from './subtask.controller'
import { SubtaskService } from './subtask.service'
import { successResponse, failedResponse } from '../../jsonResponse'
import { Subtask } from './subtask.entity'
import { subtaskMock } from './subtask.mock'

describe('SubtaskController', () => {
    let subtaskService: SubtaskService
    let subtaskController: SubtaskController
    const tmpErrorWord = 'there are some errors'

    beforeEach(async () => {
        subtaskService = new SubtaskService(null)
        subtaskController = new SubtaskController(subtaskService)
    })

    describe('createSubtask', () => {
        it('should return success response with created subtask', async () => {
            const resultPromise: Promise<Subtask> = new Promise((resolve, reject) => {
                resolve(subtaskMock)
            })
            jest.spyOn(subtaskService, 'create').mockImplementation(() => resultPromise)
            const expected = successResponse(await resultPromise)
            const got = await subtaskController.createSubtask(1, 'test subtask')

            expect(got).toStrictEqual(expected)
        })
        it('should return failed resposne with message', async () => {
            const resultPromise: Promise<any> = new Promise((resolve, reject) => {
                resolve(null)
            })
            jest.spyOn(subtaskService, 'create').mockImplementation(() => resultPromise)
            const expected = failedResponse(tmpErrorWord)
            const got = await subtaskController.createSubtask(1, 'test subtask')

            expect(got).toStrictEqual(expected)
        })
    })

    describe('updateSubtask', () => {
        it('should return success response with updated subtask', async () => {
            const resultPromise: Promise<Subtask> = new Promise((resolve, reject) => {
                resolve(subtaskMock)
            })
            jest.spyOn(subtaskService, 'update').mockImplementation(() => resultPromise)
            const expected = successResponse(await resultPromise)
            const got = await subtaskController.updateSubtask(1, 1, 'pending')

            expect(got).toStrictEqual(expected)
        })
        it('should return failed resposne with message', async () => {
            const resultPromise: Promise<any> = new Promise((resolve, reject) => {
                resolve(null)
            })
            jest.spyOn(subtaskService, 'update').mockImplementation(() => resultPromise)
            const expected = failedResponse(tmpErrorWord)
            const got = await subtaskController.updateSubtask(1, 1, 'pending')

            expect(got).toStrictEqual(expected)
        })
    })
})