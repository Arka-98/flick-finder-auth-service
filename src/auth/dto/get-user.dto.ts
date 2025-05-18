import { IdAndTimestampDto } from '@flick-finder/common';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto extends IdAndTimestampDto {
  @ApiProperty({ minLength: 3 })
  name: string;

  @ApiProperty({ format: 'email' })
  email: string;

  @ApiProperty({ format: 'phone' })
  phone: string;

  @ApiProperty()
  dob: Date;
}
