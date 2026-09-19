import { model, Schema } from "mongoose";
import { User } from "./user.entity";
import { Role } from "../../utils/user.role.enum";

const userSchema = new Schema<User>({
  firstName: String,
  lastName: String,
  role: {
    type: String,
    enum: [Role.student, Role.teacher],
  },
  picture: String,
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret: any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

userSchema.set("toObject", {
  virtuals: true,
  transform: (_, ret: any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const UserModel = model<User>("User", userSchema);
