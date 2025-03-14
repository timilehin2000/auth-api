import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SetBiometricKeyInput {
  @Field()
  biometricKey: string;
}
