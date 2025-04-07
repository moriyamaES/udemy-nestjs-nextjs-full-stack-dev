import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  nickname?: string;
}
// This DTO is used to update user information. It allows for optional fields, meaning that you can update only the fields you want to change.