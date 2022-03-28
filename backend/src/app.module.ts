import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TodoModule } from './modules/todo/todo.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://localhost:5432/todos',
      autoLoadEntities: true,
      synchronize: true
    }),
    TodoModule
  ]
})
export class AppModule { }
