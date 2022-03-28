import { Controller, Get } from '@nestjs/common'
import { TodoService } from './todo.service'

@Controller('todos')
export class TodosController {
    constructor(private todoService: TodoService) { }

    @Get()
    getTodos() {
        return this.todoService.getAll()
    }
}