import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Put, Res } from '@nestjs/common'
import { Response } from 'express';
import { TodoService } from './todo.service'
import { successResponse, failedResponse } from 'src/jsonResponse'

@Controller('todos')
export class TodosController {
    constructor(private todoService: TodoService) { }

    @Get()
    async getTodos(@Res() res: Response) {
        const todos = await this.todoService.getAll()
        if (todos) {
            return successResponse(res, HttpStatus.CREATED, todos)
        }
        return failedResponse(res, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    @Post()
    async createTodo(
        @Res() res: Response,
        @Body('title') title: string
    ) {
        const todos = await this.todoService.create({ title })
        if (todos) {
            return successResponse(res, HttpStatus.CREATED, todos)
        }
        return failedResponse(res, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    @Put(':id')
    async updateTodo(
        @Res() res: Response,
        @Param('id') id: number,
        @Body('status') status: string
    ) {
        const todo = await this.todoService.update(id, { status })
        if (todo) {
            return successResponse(res, HttpStatus.OK, todo)
        }
        return failedResponse(res, HttpStatus.NOT_FOUND)
    }
}