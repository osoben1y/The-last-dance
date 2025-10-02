import { PartialType } from '@nestjs/mapped-types'; 
import { CreateUserDto } from '../../user/dto/create-user.dto';

export class UpdateAdminDto extends PartialType(CreateUserDto) {}
