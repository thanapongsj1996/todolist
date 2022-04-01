/* istanbul ignore file */
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Subtask } from "../subtask/subtask.entity"
import { TodoController } from "./todo.controller"
import { Todo } from "./todo.entity"
import { TodoService } from "./todo.service"

@Module({
    imports: [
        TypeOrmModule.forFeature([Todo, Subtask])
    ],
    controllers: [TodoController],
    providers: [TodoService]
})
export class TodoModule { }