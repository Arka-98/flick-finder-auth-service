import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model, Types } from 'mongoose';
import { UpdateUserDto } from '../dto/update-user.dto';
import { KafkaService, ObjectUtil, TOPICS } from '@flick-finder/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly kafkaService: KafkaService,
  ) {}

  async getUserById(id: Types.ObjectId) {
    return this.userModel.findById(id).exec();
  }

  async getUsers() {
    return this.userModel.find({}).exec();
  }

  async updateUserById(id: Types.ObjectId, updateUserDto: UpdateUserDto) {
    return this.userModel
      .findByIdAndUpdate(id, { $set: updateUserDto })
      .exec()
      .then((user) => {
        if (!user) {
          throw new NotFoundException('User not found');
        }

        this.kafkaService.emit(TOPICS.USER.UPDATED, {
          value: ObjectUtil.pick(user.toObject(), [
            '_id',
            'name',
            'email',
            'phone',
            'role',
          ]),
        });

        return user;
      });
  }

  async deleteUserById(id: Types.ObjectId) {
    return this.userModel
      .findByIdAndDelete(id)
      .exec()
      .then((user) => {
        if (!user) {
          throw new NotFoundException('User not found');
        }

        this.kafkaService.emit(TOPICS.USER.DELETED, {
          value: user._id.toString(),
        });

        return user._id.toString();
      });
  }
}
