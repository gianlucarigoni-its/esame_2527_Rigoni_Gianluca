import { User } from "../user/user.entity";
import { UserModel } from "../user/user.model";
import { Classroom } from "./classroom.entity";
import { classroomModel } from "./classroom.model";
import { ClassroomResponse } from "./classroom.response";

export class ClassroomService {
  async getClassroomById(id: string): Promise<Classroom | null> {
    const classroom = await classroomModel.findById(id).exec();
    if (!classroom) return null;
    return classroom;
  }

  async getStudentClassrooms(id: string): Promise<ClassroomResponse[]> {
    const classrooms = await classroomModel.find({ students: id }).populate<{ createdBy: User }>("createdBy").exec();
    return classrooms.map((c) => {
      const obj = c.toObject();
      const { students, ...classroomResponse } = obj;
      return classroomResponse;
    });
  }

  async getTeacherClassrooms(id: string): Promise<ClassroomResponse[]> {
    const classrooms = await classroomModel.find({ createdBy: id }).populate<{ createdBy: User }>("createdBy").exec();
    return classrooms.map((c) => {
      const obj = c.toObject();
      const { students, ...classroomResponse } = obj;
      return classroomResponse;
    });
  }

  async getStudentById(studentId: string): Promise<User | null> {
    const student = await UserModel.findById(studentId).exec();
    if (!student) return null;

    return student;
  }

  async add(name: string, studentsId: string[], teacherId: string): Promise<ClassroomResponse> {
    const newClassroom = {
      name,
      students: studentsId,
      createdBy: teacherId,
    };

    const added = await classroomModel.create(newClassroom);

    const teacher = await UserModel.findById(teacherId).exec();

    return {
      id: added._id,
      name: added.name,
      studentsCount: added.studentsCount,
      createdBy: teacher!,
    };
  }
}

export default new ClassroomService();
