import { Type } from "class-transformer";
import { Role } from "../../utils/user.role.enum";
import { IsOptional, IsEnum } from "class-validator";

export class UserFileterDto {
  @IsEnum(Role)
  @IsOptional()
  type?: Role;
}
