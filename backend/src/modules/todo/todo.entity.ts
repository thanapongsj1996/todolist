import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

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
}