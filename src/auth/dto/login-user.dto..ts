import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUrl,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @MinLength(3)
  @Transform(({ value }) => value.toLowerCase().trim())
  @IsOptional()
  name: string;

  @IsString()
  @IsUrl({}, { each: true })
  @IsOptional()
  imageUrl?: string;

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
}

/*
use Matches or IsStrongPassword to validate password
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
        'The password must have a Uppercase, lowercase letter and a number',
    })
*/
