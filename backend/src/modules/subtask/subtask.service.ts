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
}