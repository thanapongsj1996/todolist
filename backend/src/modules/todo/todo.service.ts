import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Todo } from './todo.entity'

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>
    ) { }

    getAll(): Promise<Todo[]> {
        return this.todoRepository
            .createQueryBuilder('todos')
            .leftJoinAndSelect('todos.subtasks', 'subtasks')
            .orderBy({
                'todos.id': 'ASC',
                'subtasks.id': 'ASC'
            }).getMany()
    }

    create(data: any): Promise<Todo> {
        return this.todoRepository.save(data as any)
    }

    async update(id: number, data: any): Promise<any> {
        const todo = await this.todoRepository.findOne(id)
        if (!todo) {
            return null
        }

        this.todoRepository.merge(todo, data)
        return this.todoRepository.save(todo)
    }
}