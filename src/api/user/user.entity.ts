import { Role } from "../../utils/user.role.enum";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  role: {
    type: String;
    enum: ["student", "teacher"];
    required: true;
  };
  fullName: string;
  picture: string;
};
