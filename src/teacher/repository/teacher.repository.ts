import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {TeacherDocument, TeacherModel} from '../model/teacher.model';

@Injectable()
export class TeacherRepository {

  constructor(@InjectModel(TeacherModel.name) private teacherModel: Model<TeacherDocument>){}

  async createTeacher(
    name: string, 
    email: string,
    address: string, 
    birthDate: Date, 
    subject: string
  ): Promise<TeacherModel>{
   
    try {
        const teacher = await new this.teacherModel({
          name,
          email,
          address,
          birthDate,
          subject
        });
        teacher.save();
  
        return teacher;
    } catch (error) {
     throw error; 
    }  
  }

  async deleteTeacher(id: string): Promise<TeacherModel> {
    try {
      return await this.teacherModel.findByIdAndDelete({
        _id: new Types.ObjectId(id)
      });
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
      return await this.teacherModel.findByIdAndUpdate(
        {_id: new Types.ObjectId(id)},
        {
          $set:{
            name,
            email,
            address,
            birthDate,
            subject
          }
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<TeacherModel[]> {
    try {
      return await this.teacherModel.find();
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<TeacherModel> {
    try {
      return await this.teacherModel.findById({_id: new Types.ObjectId(id)});
    } catch (error) {
      throw error;
    }
  }
  
  async findByEmail(email: string): Promise<TeacherModel> {
    try {
      return await this.teacherModel.findOne({email: email});
    } catch (error) {
      throw error;
    }
  }
}