import { Injectable } from '@nestjs/common';
import {StudentModel} from './model/student.model';
import {Types} from 'mongoose';
import {StudentRepository} from './repository/student.repository';

@Injectable()
export class StudentService {
  constructor(private studentRepository: StudentRepository){}

    async createStudent(
      name: string, 
      email: string, 
      address: string, 
      birthDate: Date
    ): Promise<StudentModel> {
      try {
        const verifyStudent = await this.studentRepository.findByEmail(email);

        if(!(!verifyStudent)){
          return null;
        }else{
          return await this.studentRepository.createStudent(
            name,
            email,
            address,
            birthDate
          );
        }
      } catch (error) {
        throw error;
      }
    }

    async deleteStudent(id: string): Promise<StudentModel>{
      try {
        return await this.studentRepository.deleteStudent(id);
      } catch (error) {
        throw error;
      }
    }

    async findAll(): Promise<StudentModel[]> {
      try {
        return await this.studentRepository.findAll();
      } catch (error) {
        throw error;
      }
    }

    async findById(id: string): Promise<StudentModel>{
      try {
        return await this.studentRepository.findById(id);
      } catch (error) {
        throw error;
      }
    }

    async findByEmail(email: string): Promise<StudentModel>{
      try {
        return await this.studentRepository.findByEmail(email);
      } catch (error) {
        throw error;
      }
    }

    async updateStudent(id: string, name: string, email: string, address: string, birthDate: Date): Promise<StudentModel>{
      try {
        return await this.studentRepository.updateStudent(
          id,
          name,
          email,
          address,
          birthDate
        );
      } catch (error) {
        throw error;
      }
    }

    async findStudentsById(students: string[]): Promise<any[]> {
      try {
        const idsStudents = Array.isArray(students)? students.map(e=> new Types.ObjectId(e)) : [];

        return await this.studentRepository.findStudentsById(idsStudents);
      } catch (error) {
        throw error;
      }
    }
}
