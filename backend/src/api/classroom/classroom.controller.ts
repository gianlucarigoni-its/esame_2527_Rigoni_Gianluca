import { NextFunction, Response } from "express";
import { PermissionDeniedError } from "../../errors/permission-denied.error";
import { StudentNotFoundError } from "../../errors/student-not-found.error";
import { TypedRequest } from "../../utils/typed-request.interface";
import { Role } from "../../utils/user.role.enum";
import { createClassroomDto } from "./classroom.dto";
import classroomSrv from "./classroom.service";

export const list = async (req: TypedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new PermissionDeniedError();

    if (req.user.role == Role.student) {
      const classrooms = await classroomSrv.getStudentClassrooms(req.user.id);
      res.status(200).json(classrooms);
    } else {
      const classrooms = await classroomSrv.getTeacherClassrooms(req.user.id);
      res.status(200).json(classrooms);
    }
  } catch (err) {
    next(err);
  }
};

export const create = async (req: TypedRequest<createClassroomDto>, res: Response, next: NextFunction) => {
  try {
    await Promise.all(
      req.body.students.map(async (id) => {
        const student = await classroomSrv.getStudentById(id);
        if (!student || student.role != Role.student) throw new StudentNotFoundError();
        return student;
      }),
    );

    const newClassroom = await classroomSrv.add(req.body.name, req.body.students, req.user!.id);
    res.status(201).json(newClassroom);
  } catch (err) {
    next(err);
  }
};
