import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { GetUserDto } from '../dto/get-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Types } from 'mongoose';
import { ParseObjectIdPipe } from '@flick-finder/common';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  @ApiOkResponse({ type: GetUserDto, isArray: true })
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: GetUserDto })
  getUserById(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.usersService.getUserById(id);
  }

  @Put(':id')
  @HttpCode(204)
  @ApiParam({ name: 'id', type: String })
  @ApiNoContentResponse()
  updateUserById(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUserById(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiParam({ name: 'id', type: String })
  @ApiNoContentResponse()
  deleteUserById(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.usersService.deleteUserById(id);
  }
}
