import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoyaltyService } from './loyalty.service';
import { CreateLoyaltyDto } from './dto/create-loyalty.dto';
import { UpdateLoyaltyDto } from './dto/update-loyalty.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminOnlyGuard } from '../auth/guards/admin-only.guard';

@ApiTags('Loyalty')
@ApiBearerAuth()
@Controller('loyalty')
@UseGuards(JwtAuthGuard, AdminOnlyGuard)
export class LoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new loyalty program (Admin only)' })
  @ApiResponse({ status: 201, description: 'Loyalty program created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  create(@Body() dto: CreateLoyaltyDto) {
    return this.loyaltyService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all loyalty programs (Admin only)' })
  @ApiResponse({ status: 200, description: 'Loyalty programs retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.loyaltyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get loyalty program by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'Loyalty program retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Loyalty program not found' })
  findOne(@Param('id') id: string) {
    return this.loyaltyService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update loyalty program by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'Loyalty program updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Loyalty program not found' })
  update(@Param('id') id: string, @Body() dto: UpdateLoyaltyDto) {
    return this.loyaltyService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete loyalty program by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'Loyalty program deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Loyalty program not found' })
  remove(@Param('id') id: string) {
    return this.loyaltyService.remove(id);
  }
}
