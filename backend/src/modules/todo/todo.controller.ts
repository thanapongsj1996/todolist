import { BadRequestException, Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { TodoService } from './todo.service'

@Controller('todos')
export class TodosController {
    constructor(private todoService: TodoService) { }

    @Get()
    getTodos() {
        return this.todoService.getAll()
    }

    @Post()
    createTodo(
        @Body('title') title: string
    ) {
        return this.todoService.create({ title })
    }

    @Put(':id')
    async updateTodo(
        @Param('id') id: number,
        @Body('status') status: string
    ) {
        const todo = await this.todoService.update(id, { status })
        if (!todo) {
            throw new BadRequestException('Invalid todo')
        }

        return todo
    }
}