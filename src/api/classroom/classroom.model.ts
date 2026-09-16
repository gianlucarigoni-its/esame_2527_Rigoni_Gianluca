import { model, Schema } from "mongoose";
import { Classroom } from "./classroom.entity";

const classrommSchema = new Schema<Classroom>({
  name: String,
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

classrommSchema.virtual("studentsCount").get(function () {
  return this.students.length;
});

classrommSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret: any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

classrommSchema.set("toObject", {
  virtuals: true,
  transform: (_, ret: any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const classroomModel = model<Classroom>("Classroom", classrommSchema);
