import { Controller, Post, Get, Put, Param, Body, UseGuards, Patch, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminOnlyGuard } from '../auth/guards/admin-only.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateBaggageDto } from './dto/update-baggage.dto';
import { BaggageService } from './baggage.service';
import { CreateBaggageDto } from './dto/create-baggage.dto';

@ApiTags('Baggage')
@Controller('baggage')
export class BaggageController {
  constructor(private readonly baggageService: BaggageService) {}

  @UseGuards(JwtAuthGuard, AdminOnlyGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new baggage record (Admin only)' })
  @ApiBody({
    type: CreateBaggageDto,
    examples: {
      baggage: {
        summary: 'Create baggage example',
        value: {
          passengerName: 'John Doe',
          flightNumber: 'TK 101',
          weight: 23.5,
          status: 'checked_in'
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Baggage created successfully',
    schema: {
      example: {
        statusCode: 201,
        message: 'Success',
        data: {
          id: 'uuid-string',
          passengerName: 'John Doe',
          flightNumber: 'TK 101',
          weight: 23.5,
          status: 'checked_in',
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  create(@Body() dto: CreateBaggageDto) {
    return this.baggageService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all baggage records' })
  @ApiResponse({
    status: 200,
    description: 'Baggage records retrieved successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: [
          {
            id: 'uuid-string',
            passengerName: 'John Doe',
            flightNumber: 'TK 101',
            weight: 23.5,
            status: 'checked_in',
            createdAt: '2025-01-01T00:00:00.000Z',
            updatedAt: '2025-01-01T00:00:00.000Z'
          }
        ]
      }
    }
  })
  findAll() {
    return this.baggageService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get baggage record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Baggage record retrieved successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          id: 'uuid-string',
          passengerName: 'John Doe',
          flightNumber: 'TK 101',
          weight: 23.5,
          status: 'checked_in',
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Baggage record not found' })
  findOne(@Param('id') id: string) {
    return this.baggageService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, AdminOnlyGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update baggage record by ID (Admin only)' })
  @ApiBody({
    type: UpdateBaggageDto,
    examples: {
      update: {
        summary: 'Update baggage example',
        value: {
          weight: 25.0,
          status: 'loaded'
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Baggage record updated successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          id: 'uuid-string',
          passengerName: 'John Doe',
          flightNumber: 'TK 101',
          weight: 25.0,
          status: 'loaded',
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  @ApiResponse({ status: 404, description: 'Baggage record not found' })
  update(@Param('id') id: string, @Body() dto: UpdateBaggageDto) {
    return this.baggageService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, AdminOnlyGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete baggage record by ID (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Baggage record deleted successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          message: 'Baggage record deleted successfully'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  @ApiResponse({ status: 404, description: 'Baggage record not found' })
  remove(@Param('id') id: string) {
    return this.baggageService.remove(id);
  }
}
