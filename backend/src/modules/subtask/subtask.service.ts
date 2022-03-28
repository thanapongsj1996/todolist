import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Subtask } from "./subtask.entity";

@Injectable()
export class SubtaskService {
    constructor(
        @InjectRepository(Subtask) private readonly subtaskRepository: Repository<Subtask>
    ) { }

    create(data): Promise<Subtask[]> {
        return this.subtaskRepository.save(data)
    }

    async update(todoId: number, subtaskId: number, data): Promise<any> {
        const subtask = await this.subtaskRepository.findOne({
            where: { todoId, id: subtaskId }
        })
        if (!subtask) {
            return null
        }

        this.subtaskRepository.merge(subtask, data)
        return this.subtaskRepository.save(subtask)
    }
}