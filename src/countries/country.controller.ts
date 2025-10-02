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
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminOnlyGuard } from '../auth/guards/admin-only.guard';

@ApiTags('Countries')
@ApiBearerAuth()
@Controller('countries')
@UseGuards(JwtAuthGuard, AdminOnlyGuard)
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new country (Admin only)' })
  @ApiBody({
    type: CreateCountryDto,
    examples: {
      country: {
        summary: 'Create country example',
        value: {
          name: 'Uzbekistan',
          code: 'UZ'
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Country created successfully',
    schema: {
      example: {
        statusCode: 201,
        message: 'Success',
        data: {
          id: 'uuid-string',
          name: 'Uzbekistan',
          code: 'UZ',
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  create(@Body() dto: CreateCountryDto) {
    return this.countryService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all countries (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Countries retrieved successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: [
          {
            id: 'uuid-string',
            name: 'Uzbekistan',
            code: 'UZ',
            createdAt: '2025-01-01T00:00:00.000Z',
            updatedAt: '2025-01-01T00:00:00.000Z'
          },
          {
            id: 'uuid-string',
            name: 'Kazakhstan',
            code: 'KZ',
            createdAt: '2025-01-01T00:00:00.000Z',
            updatedAt: '2025-01-01T00:00:00.000Z'
          }
        ]
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.countryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get country by ID (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Country retrieved successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          id: 'uuid-string',
          name: 'Uzbekistan',
          code: 'UZ',
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Country not found' })
  findOne(@Param('id') id: string) {
    return this.countryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update country by ID (Admin only)' })
  @ApiBody({
    type: UpdateCountryDto,
    examples: {
      update: {
        summary: 'Update country example',
        value: {
          name: 'Republic of Uzbekistan',
          code: 'UZB'
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Country updated successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          id: 'uuid-string',
          name: 'Republic of Uzbekistan',
          code: 'UZB',
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Country not found' })
  update(@Param('id') id: string, @Body() dto: UpdateCountryDto) {
    return this.countryService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete country by ID (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Country deleted successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          message: 'Country deleted successfully'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Country not found' })
  remove(@Param('id') id: string) {
    return this.countryService.remove(id);
  }
}
