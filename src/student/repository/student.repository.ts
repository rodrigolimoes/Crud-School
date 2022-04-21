import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {StudentDocument, StudentModel} from '../model/student.model';


@Injectable()
export class StudentRepository {
  constructor(
    @InjectModel(StudentModel.name) private  studentModel: Model<StudentDocument>){}

    async createStudent(
      name: string, 
      email: string, 
      address: string, 
      birthDate: Date
    ): Promise<StudentModel> {
      try {
          const student = await new this.studentModel({
            name,
            email,
            address,
            birthDate
          });
          student.save();
    
          return student; 
      } catch (error) {
        throw error;
      }
    }

    async deleteStudent(id: string): Promise<StudentModel>{
      try {
        return await this.studentModel.findByIdAndDelete({
          _id: new Types.ObjectId(id)
        });
      } catch (error) {
        throw error;
      }
    }

    async findAll(): Promise<StudentModel[]> {
      try {
        return await this.studentModel.find();
      } catch (error) {
        throw error;
      }
    }

    async findById(id: string): Promise<StudentModel>{
      try {
        return await this.studentModel.findOne({
          _id: new Types.ObjectId(id)
        });
      } catch (error) {
        throw error;
      }
    }

    async findByEmail(email: string): Promise<StudentModel>{
      try {
        return await this.studentModel.findOne({
          email: email
        });
      } catch (error) {
        throw error;
      }
    }

    async updateStudent(
      id: string, 
      name: string, 
      email: string, 
      address: string, 
      birthDate: Date
    ): Promise<StudentModel>{
      try {
        return await this.studentModel.findOneAndUpdate(
          {_id: new Types.ObjectId(id)},
          {
            $set:{
              name,
              email,
              address,
              birthDate
            }
          }
        );
      } catch (error) {
        throw error;
      }
    }

    async findStudentsById(students: Types.ObjectId[]): Promise<StudentModel[]> {
      try {
        return await this.studentModel.aggregate([
          {
            $match: {
              _id: {$in: students }
            }
          },
          {
            $project:{
              id: 1,
              name: 1,
              email: 1,
              address: 1,
              birthDate: 1,

            }
          },
          {$sort: { name: 1}}
        ])
      } catch (error) {
        throw error;
      }
    }
}