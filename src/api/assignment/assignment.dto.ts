import { IsString } from "class-validator";

export class AssignmentDto {
  @IsString()
  title: string;
}
