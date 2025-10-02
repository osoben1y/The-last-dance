import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AirportService } from './airport.service';
import { CreateAirportDto } from './dto/create-airport.dto';
import { UpdateAirportDto } from './dto/update-airport.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminOnlyGuard } from '../auth/guards/admin-only.guard';

@ApiTags('Airports')
@ApiBearerAuth()
@Controller('airports')
@UseGuards(JwtAuthGuard, AdminOnlyGuard)
export class AirportController {
  constructor(private readonly airportService: AirportService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new airport (Admin only)' })
  @ApiBody({
    type: CreateAirportDto,
    examples: {
      airport: {
        summary: 'Create airport example',
        value: {
          name: 'Tashkent International Airport',
          cityId: '550e8400-e29b-41d4-a716-446655440000',
          code: 'TAS'
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Airport created successfully',
    schema: {
      example: {
        statusCode: 201,
        message: 'Success',
        data: {
          id: 'uuid-string',
          name: 'Tashkent International Airport',
          cityId: '550e8400-e29b-41d4-a716-446655440000',
          code: 'TAS',
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  create(@Body() dto: CreateAirportDto) {
    return this.airportService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all airports (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Airports retrieved successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: [
          {
            id: 'uuid-string',
            name: 'Tashkent International Airport',
            cityId: '550e8400-e29b-41d4-a716-446655440000',
            code: 'TAS',
            createdAt: '2025-01-01T00:00:00.000Z',
            updatedAt: '2025-01-01T00:00:00.000Z'
          }
        ]
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.airportService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get airport by ID (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Airport retrieved successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          id: 'uuid-string',
          name: 'Tashkent International Airport',
          cityId: '550e8400-e29b-41d4-a716-446655440000',
          code: 'TAS',
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Airport not found' })
  findOne(@Param('id') id: string) {
    return this.airportService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update airport by ID (Admin only)' })
  @ApiBody({
    type: UpdateAirportDto,
    examples: {
      update: {
        summary: 'Update airport example',
        value: {
          name: 'Islam Karimov Tashkent International Airport',
          code: 'TAS'
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Airport updated successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          id: 'uuid-string',
          name: 'Islam Karimov Tashkent International Airport',
          cityId: '550e8400-e29b-41d4-a716-446655440000',
          code: 'TAS',
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Airport not found' })
  update(@Param('id') id: string, @Body() dto: UpdateAirportDto) {
    return this.airportService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete airport by ID (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Airport deleted successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          message: 'Airport deleted successfully'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Airport not found' })
  remove(@Param('id') id: string) {
    return this.airportService.remove(id);
  }
}
