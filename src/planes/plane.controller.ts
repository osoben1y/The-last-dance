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
import { PlaneService } from './plane.service';
import { CreatePlaneDto } from './dto/create-plane.dto';
import { UpdatePlaneDto } from './dto/update-plane.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminOnlyGuard } from '../auth/guards/admin-only.guard';

@ApiTags('Planes')
@ApiBearerAuth()
@Controller('planes')
@UseGuards(JwtAuthGuard, AdminOnlyGuard)
export class PlaneController {
  constructor(private readonly planeService: PlaneService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new plane (Admin only)' })
  @ApiBody({
    type: CreatePlaneDto,
    examples: {
      plane: {
        summary: 'Create plane example',
        value: {
          model: 'Boeing 737-800',
          companyId: '550e8400-e29b-41d4-a716-446655440000',
          seatsCount: 180
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Plane created successfully',
    schema: {
      example: {
        statusCode: 201,
        message: 'Success',
        data: {
          id: 'uuid-string',
          model: 'Boeing 737-800',
          companyId: '550e8400-e29b-41d4-a716-446655440000',
          seatsCount: 180,
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  create(@Body() dto: CreatePlaneDto) {
    return this.planeService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all planes (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Planes retrieved successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: [
          {
            id: 'uuid-string',
            model: 'Boeing 737-800',
            companyId: '550e8400-e29b-41d4-a716-446655440000',
            seatsCount: 180,
            createdAt: '2025-01-01T00:00:00.000Z',
            updatedAt: '2025-01-01T00:00:00.000Z'
          }
        ]
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.planeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get plane by ID (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Plane retrieved successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          id: 'uuid-string',
          model: 'Boeing 737-800',
          companyId: '550e8400-e29b-41d4-a716-446655440000',
          seatsCount: 180,
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Plane not found' })
  findOne(@Param('id') id: string) {
    return this.planeService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update plane by ID (Admin only)' })
  @ApiBody({
    type: UpdatePlaneDto,
    examples: {
      update: {
        summary: 'Update plane example',
        value: {
          model: 'Boeing 737-900',
          seatsCount: 200
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Plane updated successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          id: 'uuid-string',
          model: 'Boeing 737-900',
          companyId: '550e8400-e29b-41d4-a716-446655440000',
          seatsCount: 200,
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Plane not found' })
  update(@Param('id') id: string, @Body() dto: UpdatePlaneDto) {
    return this.planeService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete plane by ID (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Plane deleted successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          message: 'Plane deleted successfully'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Plane not found' })
  remove(@Param('id') id: string) {
    return this.planeService.remove(id);
  }
}
