import { Body, Controller, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common'
import { TodoService } from './todo.service'
import { successResponse, failedResponse } from '../../jsonResponse'
import { TransformInterceptor } from '../../interceptors/transform.interceptor'

@Controller('todos')
@UseInterceptors(TransformInterceptor)
export class TodoController {
    tempErrorWord = 'there are some errors'

    constructor(
        private todoService: TodoService
    ) { }

    @Get()
    async getTodos() {
        const todos = await this.todoService.getAll()
        if (todos) {
            return successResponse(todos)
        }
        return failedResponse(this.tempErrorWord)
    }

    @Post()
    async createTodo(
        @Body('title') title: string
    ) {
        const todos = await this.todoService.create({ title })
        if (todos) {
            return successResponse(todos)
        }
        return failedResponse(this.tempErrorWord)
    }

    @Put(':id')
    async updateTodo(
        @Param('id') id: number,
        @Body('status') status: string
    ) {
        const todo = await this.todoService.update(id, { status })
        if (todo) {
            if (status == 'complete') {
                await this.todoService.completeSubtasks(id)
            }
            return successResponse(todo)
        }
        return failedResponse(this.tempErrorWord)
    }

    @Post(':todoId')
    async createSubtask(
        @Param('todoId') todoId: number,
        @Body('title') title: string
    ) {
        const subtask = await this.todoService.createSubtask({ todoId, title })
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
        const subtask = await this.todoService.updateSubtask(todoId, subtaskId, { status })
        if (subtask) {
            if (status == 'pending') {
                await this.todoService.update(todoId, { status })
            }
            return successResponse(subtask)
        }
        return failedResponse(this.tempErrorWord)
    }
}