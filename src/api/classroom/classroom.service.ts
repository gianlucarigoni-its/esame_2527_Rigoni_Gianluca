import { Role } from "../../utils/user.role.enum";
import { UserModel } from "../user/user.model";
import { Classroom } from "./classroom.entity";
import { classroomModel } from "./classroom.model";

export class ClassroomService {
  async add(name: string, usersId: string[], teacherId: string): Promise<Omit<Classroom, "students"> | null> {
    const students = await UserModel.find({ _id: { $in: usersId } }).exec();

    if (students.length != usersId.length) return null;

    const areStudentsOnly = students.every((student) => student.role === Role.student);
    if (!areStudentsOnly) return null;

    const classroomStudents = students.map((student) => student.id);

    const teacher = await UserModel.findById(teacherId);
    if (!teacher || teacher.role != Role.teacher) return null;

    const newClassroom = {
      name,
      students: classroomStudents,
      createdBy: teacherId,
    };

    const added = await classroomModel.create(newClassroom);
    const plainAdded = added.toObject();

    return {
      id: plainAdded.id,
      name: plainAdded.name,
      studentsCount: plainAdded.studentsCount,
      createdBy: teacher.toObject(),
    };
  }

  async list(id: string, role: Role): Promise<Omit<Classroom, "students">[]> {
    if (role === Role.student) {
      const classrooms = await classroomModel.find({ students: id }).exec();

      const result = classrooms.map((classroom) => {
        const { students, ...res } = classroom.toObject();
        return res;
      });

      return result;
    } else {
      const classrooms = await classroomModel.find({ createdBy: id }).exec();

      const result = classrooms.map((classroom) => {
        const { students, ...res } = classroom.toObject();
        return res;
      });

      return result;
    }
  }
}

export default new ClassroomService();
