import { PartialType } from '@nestjs/mapped-types';
import { CreateClassDto } from './create-class.dto';

/**
 * Update class DTO - all fields are optional for partial updates
 * Inherits ApiProperty decorators from CreateClassDto
 */
export class UpdateClassDto extends PartialType(CreateClassDto) {}
