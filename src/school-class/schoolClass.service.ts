import { Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {SchoolClassDocument, SchoolClassModel} from './model/schoolClass.model';
import {StudentService} from '../student/student.service';

interface ClassService {
  createSchoolClass(
    idTeacher: string,
    students: string[],
    startTime: string,
    endTime: string,
  ): Promise<SchoolClassModel | null>,
  changeTeacher(idClass: string, teacher: string): Promise<SchoolClassModel>,
  addStudents(idClass: string, students: string[]): Promise<SchoolClassModel>,
  findAll(): Promise<SchoolClassModel[]>,
  findById(id: string): Promise<SchoolClassModel>,
  deleteSchoolClass(id: string): Promise<SchoolClassModel>,
  updateTimes(id: string, startTime: string, endTime: string): Promise<any>
  removeStudent(idClass: string, idStudent: string): Promise<any>
}

@Injectable()
export class SchoolClassService implements ClassService{

  constructor(@InjectModel(SchoolClassModel.name) private readonly schoolClassModel: Model<SchoolClassDocument>, private studentService: StudentService){}

  async createSchoolClass(
    idTeacher: string, 
    students: string[], 
    startTime: string, 
    endTime: string
  ): Promise<any> {
    try {
        let schoolClass = await new this.schoolClassModel({
          teacher: idTeacher,
          students: students,
          startTime,
          endTime
        });

        schoolClass.save();

        return schoolClass;
    } catch (error) {
      throw error;
    }
  }

  async deleteSchoolClass(id: string): Promise<SchoolClassModel> {
    try {
      return await this.schoolClassModel.findByIdAndDelete({
        _id: new Types.ObjectId(id)
      });
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

  async findStudentClass(idStudent: string ){
    try {
      return await this.schoolClassModel.aggregate([
        {
          $match: {
            students: {$in:[idStudent] }
          }
        }
      ]);
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

        if( arrNewStudents.length > 0){
          return await this.schoolClassModel.findOneAndUpdate({
            _id: new Types.ObjectId(idClass)
          },
          {
            $push: {students: {$each: arrNewStudents}}
          });
        }else{
          return null;
        }

    } catch (error) {
      throw error;
    }
  }

  async changeTeacher(idClass: string, teacher: string): Promise<SchoolClassModel> {
    try {
      return await this.schoolClassModel.findByIdAndUpdate({
        _id: new Types.ObjectId(idClass)
      },
      {
        $set: {teacher: teacher}
      }
      );
    } catch (error) {
      throw error;
    }
  }

  async updateTimes(id: string, startTime: string, endTime: string): Promise<any> {
    try {
      return await this.schoolClassModel.findByIdAndUpdate({
        _id: new Types.ObjectId(id)
      },
      {
        $set: {
          startTime: startTime,
          endTime: endTime
        }
      }
      );
    } catch (error) {
      throw error;
    }
  }

  async removeStudent(idClass: string, idStudent: string){
    try {
     return await this.schoolClassModel.updateOne(
        { _id: new Types.ObjectId(idClass)},
        {
          $pull: {
            students: {$in: [idStudent]}
          }
        },
      );
    } catch (error) {
      throw error;
    }
  }
}
