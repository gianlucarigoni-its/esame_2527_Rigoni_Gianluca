import { classroomModel } from "../classroom/classroom.model";
import { User } from "../user/user.entity";
import { UserModel } from "../user/user.model";
import { Assignment, StudentAssignment } from "./assignment.entity";
import { assignmentModel } from "./assignment.model";
import { assignmentResponse } from "./assignment.response";

export class assignmentService {
  async add(title: string, classroomId: string, teacherId): Promise<assignmentResponse | null> {
    const classroom = await classroomModel.findById(classroomId).exec();
    const teacher = await UserModel.findById(teacherId).exec();

    if (!classroom || !teacher) return null;

    const studentAssignment: StudentAssignment[] = classroom.students.map((stud) => {
      return {
        studentId: stud._id,
        completed: false,
      };
    });

    const newAssignment: Omit<Assignment, "createdAt"> = {
      title,
      classroom: classroom.toObject().id,
      students: studentAssignment,
      createdBy: teacher.toObject().id,
    };

    const added = await assignmentModel.create(newAssignment);

    let completedCount = 0;
    added.students.forEach((stud) => {
      if (stud.completed == true) completedCount++;
    });

    let completed = false;
    if (added.students.length == completedCount) completed = true;

    const createdBy = await UserModel.findById(added.createdBy).exec();

    return {
      id: added._id,
      title: added.title,
      studentsCount: added.students.length,
      completedCount: completedCount,
      completed: completed,
      createdAt: added.createdAt,
      createdBy: createdBy!.toObject(),
    };
  }
}

export default new assignmentService();
