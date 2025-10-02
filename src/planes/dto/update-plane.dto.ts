import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaneDto } from './create-plane.dto';

/**
 * Update plane DTO - all fields are optional for partial updates
 * Inherits ApiProperty decorators from CreatePlaneDto
 */
export class UpdatePlaneDto extends PartialType(CreatePlaneDto) {}
