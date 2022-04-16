import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {SchoolClassDocument, SchoolClassModel} from './model/school-class.model';
import {StudentService} from '../student/student.service';

interface ClassService {
  createSchoolClass(
    idTeacher: string,
    students: string[],
    startTime: Date,
    endTime: Date,
  ): Promise<SchoolClassModel | null>,
  changeTeacher(idClass: string, teacher: string): Promise<SchoolClassModel>,
  addStudents(idClass: string, students: string[]): Promise<SchoolClassModel>,
  findAll(): Promise<SchoolClassModel[]>,
  findById(id: string): Promise<SchoolClassModel>,
  deleteSchoolClass(id: string): Promise<SchoolClassModel>,


}

@Injectable()
export class SchoolClassService implements ClassService{

  constructor(@InjectModel(SchoolClassModel.name) private readonly schoolClassModel: Model<SchoolClassDocument>, private studentService: StudentService){}

  async createSchoolClass(
    idTeacher: string, 
    students: string[], 
    startTime: Date, 
    endTime: Date
  ): Promise<SchoolClassModel> {
    try {
      
      if(
        Array.isArray(students) && 
        students.length >= 2 && 
        students.length <= 5
      ){
        let schoolClass = await new this.schoolClassModel({
          teacher: idTeacher,
          students,
          startTime,
          endTime
        });

        schoolClass.save();

        return schoolClass;
      }else{
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteSchoolClass(id: string): Promise<SchoolClassModel> {
    try {
      return await this.schoolClassModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<SchoolClassModel[]> {
    try {
  
      let schoolClass = await this.schoolClassModel.aggregate(
        [
          {
            $lookup:{
              from: 'teacher',
              localField: 'teacher',
              foreignField: '_id',
              as: 'teacher_info'
            }
          },
          {
            $project: {
              _id: 1,
              teacher: {$arrayElemAt:["$teacher_info", 0]},
              students: 1,
              startTime: 1,
              endTime:1
            }
          }
        ]
      );
      
      for(let i: number = 0; i < schoolClass.length; i++){
        const students = schoolClass[i].students;
        const populateStudents = await this.studentService.findStudentsById(
          students
        );      
        schoolClass[i].students = populateStudents;     
      }

      return schoolClass;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<SchoolClassModel> {
    try {

      let schoolClass = await this.schoolClassModel.aggregate(
        [
          {
            $match: {
              _id: new Types.ObjectId(id)
            }
          },
          {
            $lookup:{
              from: 'teacher',
              localField: 'teacher',
              foreignField: '_id',
              as: 'teacher_info'
            }
          },
          {
            $project: {
              _id: 1,
              teacher: {$arrayElemAt:["$teacher_info", 0]},
              students: 1,
              startTime: 1,
              endTime:1
            }
          }
        ]
      );

      for(let i: number = 0; i < schoolClass.length; i++){
        const students = schoolClass[i].students;
        const populateStudents = await this.studentService.findStudentsById(
          students
        );      
        schoolClass[i].students = populateStudents;     
      }

     
      return schoolClass[0];
    } catch (error) {
      throw error;
    }
  }

  async addStudents(idClass: string, students: string[]): Promise<SchoolClassModel> {
    try {
      return await this.schoolClassModel.findByIdAndUpdate({
        _id: idClass
      },
      {
        $set: {students: students}
      }
      );
    } catch (error) {
      throw error;
    }
  }

  async changeTeacher(idClass: string, teacher: string): Promise<SchoolClassModel> {
    try {
      return await this.schoolClassModel.findByIdAndUpdate({
        _id: idClass
      },
      {
        $set: {teacher: teacher}
      }
      );
    } catch (error) {
      throw error;
    }
  }
}
