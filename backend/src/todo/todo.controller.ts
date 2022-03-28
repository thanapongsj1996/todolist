import { Body, Controller, Get, Post } from '@nestjs/common'
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
}