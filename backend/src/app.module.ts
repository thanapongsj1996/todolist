/* istanbul ignore file */
import * as dotenv from 'dotenv'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TodoModule } from './modules/todo/todo.module'

dotenv.config()

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // url: "postgres://localhost:5432/todos",
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true
    }),
    TodoModule
  ]
})
export class AppModule { }
