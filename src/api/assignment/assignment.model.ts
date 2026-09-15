import { model, Schema } from "mongoose";
import { Assignment } from "./assignment.entity";

const assignmentSchema = new Schema<Assignment>({
  title: String,
  classroom: {
    type: Schema.Types.ObjectId,
    ref: "Classroom",
  },
  studentsCompleted: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: Date,
});

assignmentSchema.virtual("completedCount").get(function () {
  return this.studentsCompleted.length;
});

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
