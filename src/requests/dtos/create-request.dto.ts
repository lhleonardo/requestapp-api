import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
  Min,
} from 'class-validator';

export default class CreateRequestDTO {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(1)
  value: number;

  @IsNotEmpty()
  @IsDateString()
  deadline: Date;

  @IsNotEmpty()
  @IsUUID(4)
  ownerId: string;
}
