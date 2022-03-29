import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Todo } from "../todo/todo.entity"

@Entity('subtasks')
export class Subtask {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    todoId: number

    @Column()
    title: string

    @Column({ default: 'pending' })
    status: 'pending' | 'completed'

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(
        type => Todo,
        todo => todo.subtasks
    )
    todo: Todo
}