import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
 @Module({
  // access Note entity using TypeOrmModule
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NotesModule {}
