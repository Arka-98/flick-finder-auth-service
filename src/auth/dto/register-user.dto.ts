import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';

export class RegisterUserDto extends UpdateUserDto {
  @IsStrongPassword({
    minLength: 6,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  @ApiProperty()
  password: string;

  @IsEmail()
  @ApiProperty()
  email: string;
}
