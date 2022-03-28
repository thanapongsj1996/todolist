import { Body, Controller, Param, Post } from "@nestjs/common";
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
}