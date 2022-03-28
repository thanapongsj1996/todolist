import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubtaskController } from "./subtask.controller";
import { Subtask } from "./subtask.entity";
import { SubtaskService } from "./subtask.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Subtask])
    ],
    controllers: [SubtaskController],
    providers: [SubtaskService]
})
export class SubtaskModule { }