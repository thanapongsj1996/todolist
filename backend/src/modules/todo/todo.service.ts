import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Subtask } from './subtask.entity'
import { Todo } from './todo.entity'

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
        @InjectRepository(Subtask) private readonly subtaskRepository: Repository<Subtask>
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

    createSubtask(data: any): Promise<Subtask> {
        return this.subtaskRepository.save(data)
    }

    async updateSubtask(todoId: number, subtaskId: number, data): Promise<any> {
        const subtask = await this.subtaskRepository.findOne({
            where: { todoId, id: subtaskId }
        })
        if (!subtask) {
            return null
        }

        this.subtaskRepository.merge(subtask, data)
        return this.subtaskRepository.save(subtask)
    }

    async completeSubtasks(todoId: number) {
        return this.subtaskRepository.createQueryBuilder('subtasks')
            .update()
            .set({ status: 'completed' })
            .where({ todoId: todoId })
            .execute()
    }
}