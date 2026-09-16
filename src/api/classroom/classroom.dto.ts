import { Type } from "class-transformer";
import { IsArray, IsMongoId, IsString } from "class-validator";

export class createClassroomDto {
  @IsString()
  name: string;

  @IsArray()
  @IsString({ each: true })
  @IsMongoId({ each: true })
  usersId: string[];
}
