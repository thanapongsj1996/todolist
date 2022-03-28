import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Subtask } from "../subtask/subtask.entity"

@Entity('todos')
export class Todo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({ default: 'pending' })
    status: 'pending' | 'completed'

    @CreateDateColumn()
    createdAt: Date

    @OneToMany(
        type => Subtask,
        subtask => subtask.todo
    )
    subtasks: Subtask[]
}