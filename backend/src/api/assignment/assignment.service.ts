import { Classroom } from "../classroom/classroom.entity";
import { User } from "../user/user.entity";
import { UserModel } from "../user/user.model";
import { Assignment, AssignmentDocument, StudentAssignment } from "./assignment.entity";
import { assignmentModel } from "./assignment.model";
import { AssignmentResponse } from "./assignment.response";

export class assignmentService {
  async getAssignmentById(id: string): Promise<Assignment | null> {
    const assignment = await assignmentModel.findById(id).exec();
    if (!assignment) return null;
    return assignment;
  }

  async getStudentAssignmentsList(classroomId: string, studentId: string): Promise<AssignmentResponse[]> {
    const assignments = await assignmentModel
      .find({ classroom: classroomId })
      .populate<{ createdBy: User }>("createdBy")
      .exec();

    return assignments.map((a): AssignmentResponse => {
      const completedCount = a.students.filter((s) => s.completed).length;
      const isCompleted = a.students.some((s) => s.studentId == studentId && s.completed);
      return {
        id: a.id,
        title: a.title,
        studentsCount: a.students.length,
        completedCount: completedCount,
        completed: isCompleted,
        createdAt: a.createdAt,
        createdBy: a.createdBy,
      };
    });
  }

  async getTeacherAssignmentsList(classroomId: string): Promise<AssignmentResponse[]> {
    const assignments = await assignmentModel
      .find({ classroom: classroomId })
      .populate<{ createdBy: User }>("createdBy")
      .exec();

    return assignments.map((a): AssignmentResponse => {
      const completedCount = a.students.filter((s) => s.completed).length;
      return {
        id: a.id,
        title: a.title,
        studentsCount: a.students.length,
        completedCount: completedCount,
        createdAt: a.createdAt,
        createdBy: a.createdBy,
      };
    });
  }

  async add(title: string, classroom: Classroom): Promise<AssignmentResponse> {
    const studentAssignment: StudentAssignment[] = classroom.students.map((stud) => {
      return {
        studentId: stud.toString(),
        completed: false,
      };
    });

    const newAssignment: AssignmentDocument = {
      title,
      classroom: classroom.id,
      students: studentAssignment,
      createdBy: classroom.createdBy.toString(),
    };

    const added = await assignmentModel.create(newAssignment);

    const createdBy = await UserModel.findById(added.createdBy).exec();

    return {
      id: added._id,
      title: added.title,
      studentsCount: added.studentsCount,
      completedCount: added.completedCount,
      createdAt: added.createdAt,
      createdBy: createdBy!.toObject(),
    };
  }

  async completeAssignment(id: string, studentId: string): Promise<AssignmentResponse | null> {
    const assignment = await assignmentModel
      .findByIdAndUpdate(
        id,
        {
          $set: { "students.$[elem].completed": true },
        },
        {
          new: true,
          arrayFilters: [{ "elem.studentId": studentId }],
        },
      )
      .populate<{ createdBy: User }>("createdBy")
      .exec();

    return {
      id: assignment!.id,
      title: assignment!.title,
      studentsCount: assignment!.studentsCount,
      completedCount: assignment!.completedCount,
      completed: true,
      createdAt: assignment!.createdAt,
      createdBy: assignment!.createdBy,
    };
  }
}

export default new assignmentService();
