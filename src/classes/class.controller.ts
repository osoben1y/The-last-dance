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
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminOnlyGuard } from '../auth/guards/admin-only.guard';

@ApiTags('Classes')
@ApiBearerAuth()
@Controller('classes')
@UseGuards(JwtAuthGuard, AdminOnlyGuard)
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new class (Admin only)' })
  @ApiBody({
    type: CreateClassDto,
    examples: {
      class: {
        summary: 'Create class example',
        value: {
          name: 'BUSINESS',
          price: 500.00
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Class created successfully',
    schema: {
      example: {
        statusCode: 201,
        message: 'Success',
        data: {
          id: 'uuid-string',
          name: 'BUSINESS',
          price: 500.00,
          createdAt: '2025-01-01T00:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  create(@Body() dto: CreateClassDto) {
    return this.classService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all classes (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Classes retrieved successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: [
          {
            id: 'uuid-string',
            name: 'ECONOMY',
            price: 100.00,
            createdAt: '2025-01-01T00:00:00.000Z'
          },
          {
            id: 'uuid-string',
            name: 'BUSINESS',
            price: 500.00,
            createdAt: '2025-01-01T00:00:00.000Z'
          },
          {
            id: 'uuid-string',
            name: 'FIRST',
            price: 1000.00,
            createdAt: '2025-01-01T00:00:00.000Z'
          }
        ]
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.classService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get class by ID (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Class retrieved successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          id: 'uuid-string',
          name: 'BUSINESS',
          price: 500.00,
          createdAt: '2025-01-01T00:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Class not found' })
  findOne(@Param('id') id: string) {
    return this.classService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update class by ID (Admin only)' })
  @ApiBody({
    type: UpdateClassDto,
    examples: {
      update: {
        summary: 'Update class example',
        value: {
          price: 550.00
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Class updated successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          id: 'uuid-string',
          name: 'BUSINESS',
          price: 550.00,
          createdAt: '2025-01-01T00:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Class not found' })
  update(@Param('id') id: string, @Body() dto: UpdateClassDto) {
    return this.classService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete class by ID (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Class deleted successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          message: 'Class deleted successfully'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Class not found' })
  remove(@Param('id') id: string) {
    return this.classService.remove(id);
  }
}
