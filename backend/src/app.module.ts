/* istanbul ignore file */
import * as dotenv from 'dotenv'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SubtaskModule } from './modules/subtask/subtask.module'
import { TodoModule } from './modules/todo/todo.module'

dotenv.config()

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true
    }),
    TodoModule,
    SubtaskModule
  ]
})
export class AppModule { }
