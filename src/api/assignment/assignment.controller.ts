import { NextFunction, Response } from "express";
import { AssignmentAlreadyCompletedError } from "../../errors/already-completed.error";
import { AssignmentNotFoundError } from "../../errors/assignment.not.found.error";
import { ClassroomAccessDeniedError } from "../../errors/classroom-access-denied.error";
import { ClassroomNotFoundError } from "../../errors/classroom-not-found.error";
import { PermissionDeniedError } from "../../errors/permission-denied.error";
import { TypedRequest } from "../../utils/typed-request.interface";
import { Role } from "../../utils/user.role.enum";
import classroomSrv from "../classroom/classroom.service";
import { AssignmentDto } from "./assignment.dto";
import assignmentSrv from "./assignment.service";

export const list = async (req: TypedRequest, res: Response, next: NextFunction) => {
  try {
    const classroom = await classroomSrv.getClassroomById(req.params.classroomId);
    if (!classroom) throw new ClassroomNotFoundError();

    if (req.user!.role == Role.student) {
      // Student
      let isSubscribed = false;
      classroom.students.map((s) => {
        if (req.user!.id == s.toString()) isSubscribed = true;
      });
      if (!isSubscribed) throw new ClassroomAccessDeniedError();

      const list = await assignmentSrv.getStudentAssignmentsList(classroom.id.toString(), req.user!.id);
      res.status(200).json(list);
    } else {
      // Teacher
      if (req.user!.id != classroom.createdBy.toString()) throw new ClassroomAccessDeniedError();

      const list = await assignmentSrv.getTeacherAssignmentsList(classroom.id.toString());
      res.status(200).json(list);
    }
  } catch (err) {
    next(err);
  }
};

export const add = async (req: TypedRequest<AssignmentDto>, res: Response, next: NextFunction) => {
  try {
    const classroom = await classroomSrv.getClassroomById(req.params.classroomId);
    if (!classroom) throw new ClassroomNotFoundError();

    if (req.user!.id != classroom.createdBy.toString()) throw new ClassroomAccessDeniedError();

    const added = await assignmentSrv.add(req.body.title, classroom);

    res.status(201).json(added);
  } catch (err) {
    next(err);
  }
};

export const completeAssignment = async (req: TypedRequest, res: Response, next: NextFunction) => {
  try {
    const classroom = await classroomSrv.getClassroomById(req.params.classroomId);
    if (!classroom) throw new ClassroomNotFoundError();

    let isSubscribed = false;
    classroom.students.map((s) => {
      if (req.user!.id == s.toString()) isSubscribed = true;
    });
    if (!isSubscribed) throw new ClassroomAccessDeniedError();

    const assignment = await assignmentSrv.getAssignmentById(req.params.id);
    if (!assignment || assignment.classroom.toString() != req.params.classroomId) throw new AssignmentNotFoundError();

    assignment.students.forEach((s) => {
      if (s.studentId.toString() === req.user!.id && s.completed === true) throw new AssignmentAlreadyCompletedError();
    });

    const result = await assignmentSrv.completeAssignment(req.params.id, req.user!.id);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
