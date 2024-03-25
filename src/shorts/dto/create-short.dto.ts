import { IsOptional, IsString, IsUrl, MinLength } from 'class-validator';
export class CreateShortDto {
  @IsString()
  @IsUrl()
  url_redirect: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  name: string;
}
