import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Todo } from './todo.entity'

type Todos = {
    title: string
    status: 'pending' | 'completed'
    createdAt: Date
}

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>
    ) { }

    getAll(): Promise<Todo[]> {
        return this.todoRepository.find()
    }
}