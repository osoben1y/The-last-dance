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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SeatService } from './seat.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminOnlyGuard } from '../auth/guards/admin-only.guard';

@ApiTags('Seats')
@ApiBearerAuth()
@Controller('seats')
@UseGuards(JwtAuthGuard, AdminOnlyGuard)
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new seat (Admin only)' })
  @ApiBody({
    type: CreateSeatDto,
    examples: {
      seat: {
        summary: 'Create seat example',
        value: {
          seatNumber: '12A',
          planeId: '550e8400-e29b-41d4-a716-446655440000',
          classId: '550e8400-e29b-41d4-a716-446655440001',
          isAvailable: true
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Seat created successfully',
    schema: {
      example: {
        statusCode: 201,
        message: 'Success',
        data: {
          id: 'uuid-string',
          seatNumber: '12A',
          planeId: '550e8400-e29b-41d4-a716-446655440000',
          classId: '550e8400-e29b-41d4-a716-446655440001',
          isAvailable: true,
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  create(@Body() dto: CreateSeatDto) {
    return this.seatService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all seats (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Seats retrieved successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: [
          {
            id: 'uuid-string',
            seatNumber: '12A',
            planeId: '550e8400-e29b-41d4-a716-446655440000',
            classId: '550e8400-e29b-41d4-a716-446655440001',
            isAvailable: true,
            createdAt: '2025-01-01T00:00:00.000Z',
            updatedAt: '2025-01-01T00:00:00.000Z'
          }
        ]
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.seatService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get seat by ID (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Seat retrieved successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          id: 'uuid-string',
          seatNumber: '12A',
          planeId: '550e8400-e29b-41d4-a716-446655440000',
          classId: '550e8400-e29b-41d4-a716-446655440001',
          isAvailable: true,
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Seat not found' })
  findOne(@Param('id') id: string) {
    return this.seatService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update seat by ID (Admin only)' })
  @ApiBody({
    type: UpdateSeatDto,
    examples: {
      update: {
        summary: 'Update seat example',
        value: {
          isAvailable: false
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Seat updated successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          id: 'uuid-string',
          seatNumber: '12A',
          planeId: '550e8400-e29b-41d4-a716-446655440000',
          classId: '550e8400-e29b-41d4-a716-446655440001',
          isAvailable: false,
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Seat not found' })
  update(@Param('id') id: string, @Body() dto: UpdateSeatDto) {
    return this.seatService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete seat by ID (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Seat deleted successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          message: 'Seat deleted successfully'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Seat not found' })
  remove(@Param('id') id: string) {
    return this.seatService.remove(id);
  }
}
