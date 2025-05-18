import { IUser, RolesEnum } from '@flick-finder/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  toJSON: {
    transform: function (_, ret) {
      delete ret.__v;
    },
  },
})
export class User implements IUser {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({ type: Number })
  phone: number;

  @Prop({ type: Date })
  dob: Date;

  @Prop({ enum: RolesEnum, default: RolesEnum.CUSTOMER })
  role: RolesEnum;

  @Prop()
  password: string;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop({ default: false })
  phoneVerified: boolean;

  @Prop({ default: false })
  blocked: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
