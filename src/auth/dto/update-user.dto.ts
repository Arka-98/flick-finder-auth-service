import { RolesEnum } from '@flick-finder/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsMobilePhone,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @ApiPropertyOptional()
  name?: string;

  @IsMobilePhone('en-IN')
  @IsOptional()
  @ApiPropertyOptional()
  phone?: string;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional()
  dob?: string;

  @IsEnum(RolesEnum)
  @IsOptional()
  @ApiPropertyOptional({ enum: RolesEnum })
  role?: RolesEnum;
}
