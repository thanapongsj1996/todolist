import { Injectable } from '@nestjs/common'

type Todos = {
    title: string
    status: 'pending' | 'completed'
    createdAt: Date
}

@Injectable()
export class TodoService {
    constructor() { }

    getAll(): Todos[] {
        return [
            {
                title: 'Todo01',
                status: 'pending',
                createdAt: new Date(),
            },
            {
                title: 'Todo02',
                status: 'completed',
                createdAt: new Date(),
            },
        ]
    }
}