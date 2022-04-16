import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {StudentDocument, StudentModel} from './model/student.model';

interface StudentMethod {
  createStudent(
    name: string, 
    email: string,
    address: string, 
    birthDate: Date, 
  ): Promise<StudentModel | null>,
  updateStudent(
    id: string,
    name: string, 
    email: string,
    address: string, 
    birthDate: Date, 
  ): Promise<StudentModel>,
  deleteStudent(id: string): Promise<StudentModel>,
  findAll(): Promise<StudentModel[]>,
  findById(id: string): Promise<StudentModel>,
  findByEmail(email: string): Promise<StudentModel>,
}

@Injectable()
export class StudentService implements StudentMethod {
  constructor(
    @InjectModel(StudentModel.name) private readonly studentModel: Model<StudentDocument>){}

    async createStudent(name: string, email: string, address: string, birthDate: Date): Promise<StudentModel> {
      try {
        const verifyStudent = await this.findByEmail(email);

        if(!(!verifyStudent)){
          return null;
        }else{
          const student = await new this.studentModel({
            name,
            email,
            address,
            birthDate
          });
          student.save();
    
          return student; 
        }
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

    async updateStudent(id: string, name: string, email: string, address: string, birthDate: Date): Promise<StudentModel>{
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
}
