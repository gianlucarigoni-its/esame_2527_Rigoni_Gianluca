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

    return { id: plainAdded.id, name: plainAdded.name, studentsCount: plainAdded.studentsCount, createdBy: teacher.toObject() };
  }
}

export default new ClassroomService();
