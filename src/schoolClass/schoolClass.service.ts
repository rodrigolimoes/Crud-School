import { Injectable} from '@nestjs/common';
import {Types} from 'mongoose';
import {SchoolClassModel} from './model/schoolClass.model';
import {StudentService} from '../student/student.service';
import {SchoolClassRepository} from './repository/schoolClass.repository';

@Injectable()
export class SchoolClassService {

  constructor(
    private schoolClassRepository: SchoolClassRepository, 
    private studentService: StudentService
  ){}

  async createSchoolClass(
    idTeacher: string, 
    students: string[], 
    startTime: string, 
    endTime: string
  ): Promise<any> {
    try {
        return await this.schoolClassRepository.createSchoolClass(
          idTeacher,
          students,
          startTime,
          endTime,
        );
    } catch (error) {
      throw error;
    }
  }

  async deleteSchoolClass(id: string): Promise<SchoolClassModel> {
    try {
      return await this.schoolClassRepository.deleteSchoolClass(id);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<SchoolClassModel[]> {
    try {
      let schoolClass = await this.schoolClassRepository.findAll();
      
      if(Array.isArray(schoolClass) && schoolClass.length > 0){
        for(let i: number = 0; i < schoolClass.length; i++){
          const students = schoolClass[i].students;
          const populateStudents = await this.studentService.findStudentsById(
            students
          );      
          schoolClass[i].students = populateStudents;     
        }
      }
      return schoolClass;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<SchoolClassModel> {
    try {

      let schoolClass = await this.schoolClassRepository.findById(id);
      if(Array.isArray(schoolClass) && schoolClass.length > 0){
        for(let i:number = 0; i < schoolClass.length;i++){
          const students = schoolClass[i].students;
          const populateStudents = students.length > 0? await this.studentService.findStudentsById(students): [];      
          schoolClass[i].students = populateStudents;     
        }
        }
      return schoolClass[0];
    } catch (error) {
      throw error;
    }
  }

  async findStudentClass(idStudent: string){
    try {
      return await this.schoolClassRepository.findStudentClass(idStudent);
    } catch (error) {
      throw error;
    }
  }

  async addStudents(idClass: string, students: string[]): Promise<any> {
    try {
        let arrNewStudents: string[] = [];
        const currentClass = await this.findById(idClass);

        if(currentClass){
          const studentsInClass = currentClass.students.map((e: any)=> e._id.valueOf());

          for(let i: number = 0; i < students.length; i++){
            const isIncludeInClass = studentsInClass.includes(students[i]);

            if(!isIncludeInClass){
              arrNewStudents.push(students[i]);
            }
          }
        }

        return await this.schoolClassRepository.addStudents(idClass, arrNewStudents);

    } catch (error) {
      throw error;
    }
  }

  async changeTeacher(idClass: string, teacher: string): Promise<SchoolClassModel> {
    try {
      return await this.schoolClassRepository.changeTeacher(idClass, teacher);
    } catch (error) {
      throw error;
    }
  }

  async updateTimes(id: string, startTime: string, endTime: string): Promise<any> {
    try {
      return await this.schoolClassRepository.updateTimes(id, startTime, endTime);
    } catch (error) {
      throw error;
    }
  }

  async removeStudent(idClass: string, idStudent: string){
    try {
      return await this.schoolClassRepository.removeStudent(idClass, idStudent);
    } catch (error) {
      throw error;
    }
  }
}
