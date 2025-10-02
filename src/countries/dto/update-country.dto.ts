import { PartialType } from '@nestjs/mapped-types';
import { CreateCountryDto } from './create-country.dto';

/**
 * Update country DTO - all fields are optional for partial updates
 * Inherits ApiProperty decorators from CreateCountryDto
 */
export class UpdateCountryDto extends PartialType(CreateCountryDto) {}
