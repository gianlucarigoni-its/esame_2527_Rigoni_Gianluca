import { model, Schema } from "mongoose";
import { Assignment } from "./assignment.entity";

const assignmentSchema = new Schema<Assignment>(
  {
    title: String,
    classroom: {
      type: Schema.Types.ObjectId,
      ref: "Classroom",
    },
    students: [
      {
        studentId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  },
);

assignmentSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret: any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

assignmentSchema.set("toObject", {
  virtuals: true,
  transform: (_, ret: any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const assignmentModel = model<Assignment>("Assignment", assignmentSchema);
