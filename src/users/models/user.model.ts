import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field(() => String, { nullable: true })
  biometricKey?: string | null;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
