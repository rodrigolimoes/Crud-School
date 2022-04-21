import { Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {SchoolClassDocument, SchoolClassModel} from '../model/schoolClass.model';

@Injectable()
export class SchoolClassRepository {

  constructor(@InjectModel(SchoolClassModel.name) private readonly schoolClassModel: Model<SchoolClassDocument>){}

  async createSchoolClass(
    idTeacher: string, 
    students: string[], 
    startTime: string, 
    endTime: string
  ): Promise<SchoolClassModel> {
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
      return await this.schoolClassModel.aggregate(
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
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<SchoolClassModel[]> {
    try {
      return await this.schoolClassModel.aggregate(
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
        return await this.schoolClassModel.findOneAndUpdate({
          _id: new Types.ObjectId(idClass)
        },
        {
          $push: {students: {$each: students}
        }});
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
