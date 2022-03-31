export type Todos = {
    id: number
    title: string
    status: string
    subtasks: Subtask[]
}
export type Subtask = {
    id: number
    todoId: number
    title: string
    status: string
}