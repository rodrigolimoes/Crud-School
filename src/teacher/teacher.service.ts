import { Injectable } from '@nestjs/common';
import {TeacherRepository} from './repository/teacher.repository';
import {TeacherModel} from './model/teacher.model';

@Injectable()
export class TeacherService {

  constructor(private teacherRepository: TeacherRepository){}

  async createTeacher(
    name: string, 
    email: string,
    address: string, 
    birthDate: Date, 
    subject: string
  ): Promise<TeacherModel | null>{
   
    try {
      const verifyTeacherExist = await this.findByEmail(email);

      if(!(!verifyTeacherExist)){
        return null;
      }else{
        return await this.teacherRepository.createTeacher(
          name,
          email,
          address,
          birthDate,
          subject
        );
      }
    } catch (error) {
     throw error; 
    }  
  }

  async deleteTeacher(id: string): Promise<TeacherModel> {
    try {
      return await this.teacherRepository.deleteTeacher(id);
    } catch (error) {
      throw error;
    }
  }

  async updateTeacher(
    id: string, 
    name: string, 
    email: string, 
    address: string, 
    birthDate: Date, 
    subject: string
  ): Promise<TeacherModel> {
    try {
      return await this.teacherRepository.updateTeacher(
        id,
        name,
        email,
        address,
        birthDate,
        subject
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<TeacherModel[]> {
    try {
      return await this.teacherRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<TeacherModel> {
    try {
      return await this.teacherRepository.findById(id);
    } catch (error) {
      throw error;
    }
  } 

  async findByEmail(email: string): Promise<TeacherModel> {
    try {
      return await this.teacherRepository.findByEmail(email);
    } catch (error) {
      throw error;
    }
  }
}
