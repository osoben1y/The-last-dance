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
import { FlightService } from './flight.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminOnlyGuard } from '../auth/guards/admin-only.guard';

@ApiTags('Flights')
@ApiBearerAuth()
@Controller('flights')
@UseGuards(JwtAuthGuard, AdminOnlyGuard)
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new flight (Admin only)' })
  @ApiBody({
    type: CreateFlightDto,
    examples: {
      flight: {
        summary: 'Create flight example',
        value: {
          planeId: '550e8400-e29b-41d4-a716-446655440000',
          fromAirportId: '550e8400-e29b-41d4-a716-446655440001',
          toAirportId: '550e8400-e29b-41d4-a716-446655440002',
          departureTime: '2025-01-15T10:30:00Z',
          arrivalTime: '2025-01-15T14:45:00Z',
          status: 'SCHEDULED'
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Flight created successfully',
    schema: {
      example: {
        statusCode: 201,
        message: 'Success',
        data: {
          id: 'uuid-string',
          planeId: '550e8400-e29b-41d4-a716-446655440000',
          fromAirportId: '550e8400-e29b-41d4-a716-446655440001',
          toAirportId: '550e8400-e29b-41d4-a716-446655440002',
          departureTime: '2025-01-15T10:30:00Z',
          arrivalTime: '2025-01-15T14:45:00Z',
          status: 'SCHEDULED',
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  create(@Body() dto: CreateFlightDto) {
    return this.flightService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all flights (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Flights retrieved successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: [
          {
            id: 'uuid-string',
            planeId: '550e8400-e29b-41d4-a716-446655440000',
            fromAirportId: '550e8400-e29b-41d4-a716-446655440001',
            toAirportId: '550e8400-e29b-41d4-a716-446655440002',
            departureTime: '2025-01-15T10:30:00Z',
            arrivalTime: '2025-01-15T14:45:00Z',
            status: 'SCHEDULED',
            createdAt: '2025-01-01T00:00:00.000Z',
            updatedAt: '2025-01-01T00:00:00.000Z'
          }
        ]
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.flightService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get flight by ID (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Flight retrieved successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          id: 'uuid-string',
          planeId: '550e8400-e29b-41d4-a716-446655440000',
          fromAirportId: '550e8400-e29b-41d4-a716-446655440001',
          toAirportId: '550e8400-e29b-41d4-a716-446655440002',
          departureTime: '2025-01-15T10:30:00Z',
          arrivalTime: '2025-01-15T14:45:00Z',
          status: 'SCHEDULED',
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Flight not found' })
  findOne(@Param('id') id: string) {
    return this.flightService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update flight by ID (Admin only)' })
  @ApiBody({
    type: UpdateFlightDto,
    examples: {
      update: {
        summary: 'Update flight example',
        value: {
          status: 'DELAYED',
          departureTime: '2025-01-15T11:00:00Z'
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Flight updated successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          id: 'uuid-string',
          planeId: '550e8400-e29b-41d4-a716-446655440000',
          fromAirportId: '550e8400-e29b-41d4-a716-446655440001',
          toAirportId: '550e8400-e29b-41d4-a716-446655440002',
          departureTime: '2025-01-15T11:00:00Z',
          arrivalTime: '2025-01-15T14:45:00Z',
          status: 'DELAYED',
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Flight not found' })
  update(@Param('id') id: string, @Body() dto: UpdateFlightDto) {
    return this.flightService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete flight by ID (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Flight deleted successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          message: 'Flight deleted successfully'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Flight not found' })
  remove(@Param('id') id: string) {
    return this.flightService.remove(id);
  }
}
