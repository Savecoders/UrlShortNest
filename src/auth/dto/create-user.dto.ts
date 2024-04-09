import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @Transform(({ value }) => value.toLowerCase())
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MaxLength(50)
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'The password must have a Uppercase, lowercase letter, a number and a symbol',
    },
  )
  password: string;

  @Transform(({ value }) => value.toLowerCase().trim())
  @IsString()
  @MinLength(3)
  name: string;
}
