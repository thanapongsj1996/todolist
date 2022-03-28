import { Module } from "@nestjs/common"
import { TodosController } from "./todo.controller"
import { TodoService } from "./todo.service"

@Module({
    imports: [],
    controllers: [TodosController],
    providers: [TodoService]
})
export class TodoModule { }