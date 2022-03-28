import { Body, Controller, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { SubtaskService } from "./subtask.service";

@Controller('subtasks')
export class SubtaskController {
    constructor(private subtaskService: SubtaskService) { }

    @Post(':todoId')
    createSubtask(
        @Param('todoId') todoId: number,
        @Body('title') title: string
    ) {
        return this.subtaskService.create({ todoId, title })
    }

    @Put(':todoId/:subtaskId')
    async updateSubtask(
        @Param('todoId') todoId: number,
        @Param('subtaskId') subtaskId: number,
        @Body('status') status: string
    ) {
        const subtask = await this.subtaskService.update(todoId, subtaskId, { status })
        if (!subtask) {
            throw new NotFoundException('Subtask not found')
        }

        return subtask
    }
}