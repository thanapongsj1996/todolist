import { Body, Controller, HttpStatus, NotFoundException, Param, Post, Put, Res } from "@nestjs/common"
import { Response } from 'express'
import { SubtaskService } from "./subtask.service"
import { successResponse, failedResponse } from 'src/jsonResponse'

@Controller('subtasks')
export class SubtaskController {
    constructor(private subtaskService: SubtaskService) { }

    @Post(':todoId')
    async createSubtask(
        @Res() res: Response,
        @Param('todoId') todoId: number,
        @Body('title') title: string
    ) {
        const subtask = await this.subtaskService.create({ todoId, title })
        if (subtask) {
            return successResponse(res, HttpStatus.CREATED, subtask)
        }
        return failedResponse(res, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    @Put(':todoId/:subtaskId')
    async updateSubtask(
        @Res() res: Response,
        @Param('todoId') todoId: number,
        @Param('subtaskId') subtaskId: number,
        @Body('status') status: string
    ) {
        const subtask = await this.subtaskService.update(todoId, subtaskId, { status })
        if (subtask) {
            return successResponse(res, HttpStatus.OK, subtask)
        }
        return failedResponse(res, HttpStatus.NOT_FOUND)
    }
}