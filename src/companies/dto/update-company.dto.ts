import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';

/**
 * Update company DTO - all fields are optional for partial updates
 * Inherits ApiProperty decorators from CreateCompanyDto
 */
export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}
