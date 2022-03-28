import { Body, Controller, Get, Post } from '@nestjs/common'
import { TodoService } from './todo.service'

@Controller('todos')
export class TodosController {
    constructor(private todoService: TodoService) { }

    @Get()
    async getTodos() {
        return this.todoService.getAll()

    }

    @Post()
    async createTodo(
        @Body('title') title: string
    ) {
        this.todoService.create({ title })
    }
}