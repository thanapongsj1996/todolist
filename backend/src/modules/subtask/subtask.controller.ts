import { Body, Controller, Param, Post, Put } from '@nestjs/common'
import { SubtaskService } from './subtask.service'
import { successResponse, failedResponse } from '../../jsonResponse'

@Controller('subtasks')
export class SubtaskController {
    tempErrorWord = 'there are some errors'

    constructor(private subtaskService: SubtaskService) { }

    @Post(':todoId')
    async createSubtask(
        @Param('todoId') todoId: number,
        @Body('title') title: string
    ) {
        const subtask = await this.subtaskService.create({ todoId, title })
        if (subtask) {
            return successResponse(subtask)
        }
        return failedResponse(this.tempErrorWord)
    }

    @Put(':todoId/:subtaskId')
    async updateSubtask(
        @Param('todoId') todoId: number,
        @Param('subtaskId') subtaskId: number,
        @Body('status') status: string
    ) {
        const subtask = await this.subtaskService.update(todoId, subtaskId, { status })
        if (subtask) {
            return successResponse(subtask)
        }
        return failedResponse(this.tempErrorWord)
    }
}