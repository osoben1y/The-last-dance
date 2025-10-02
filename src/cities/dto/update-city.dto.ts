import { PartialType } from '@nestjs/mapped-types';
import { CreateCityDto } from './create-city.dto';

/**
 * Update city DTO - all fields are optional for partial updates
 * Inherits ApiProperty decorators from CreateCityDto
 */
export class UpdateCityDto extends PartialType(CreateCityDto) {}
