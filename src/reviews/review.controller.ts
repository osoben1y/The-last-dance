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
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminOnlyGuard } from '../auth/guards/admin-only.guard';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminOnlyGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new review (Admin only)' })
  @ApiBody({
    type: CreateReviewDto,
    examples: {
      review: {
        summary: 'Create review example',
        value: {
          userId: '550e8400-e29b-41d4-a716-446655440000',
          flightId: '550e8400-e29b-41d4-a716-446655440001',
          rating: 5,
          comment: 'Excellent service and comfortable flight!'
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Review created successfully',
    schema: {
      example: {
        statusCode: 201,
        message: 'Success',
        data: {
          id: 'uuid-string',
          userId: '550e8400-e29b-41d4-a716-446655440000',
          flightId: '550e8400-e29b-41d4-a716-446655440001',
          rating: 5,
          comment: 'Excellent service and comfortable flight!',
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reviews' })
  @ApiResponse({
    status: 200,
    description: 'Reviews retrieved successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: [
          {
            id: 'uuid-string',
            userId: '550e8400-e29b-41d4-a716-446655440000',
            flightId: '550e8400-e29b-41d4-a716-446655440001',
            rating: 5,
            comment: 'Excellent service and comfortable flight!',
            createdAt: '2025-01-01T00:00:00.000Z',
            updatedAt: '2025-01-01T00:00:00.000Z'
          }
        ]
      }
    }
  })
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get review by ID' })
  @ApiResponse({
    status: 200,
    description: 'Review retrieved successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          id: 'uuid-string',
          userId: '550e8400-e29b-41d4-a716-446655440000',
          flightId: '550e8400-e29b-41d4-a716-446655440001',
          rating: 5,
          comment: 'Excellent service and comfortable flight!',
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Review not found' })
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminOnlyGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update review by ID (Admin only)' })
  @ApiBody({
    type: UpdateReviewDto,
    examples: {
      update: {
        summary: 'Update review example',
        value: {
          rating: 4,
          comment: 'Very good service, flight was comfortable.'
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Review updated successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          id: 'uuid-string',
          userId: '550e8400-e29b-41d4-a716-446655440000',
          flightId: '550e8400-e29b-41d4-a716-446655440001',
          rating: 4,
          comment: 'Very good service, flight was comfortable.',
          createdAt: '2025-01-01T00:00:00.000Z',
          updatedAt: '2025-01-01T00:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  @ApiResponse({ status: 404, description: 'Review not found' })
  update(@Param('id') id: string, @Body() dto: UpdateReviewDto) {
    return this.reviewService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminOnlyGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete review by ID (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Review deleted successfully',
    schema: {
      example: {
        statusCode: 200,
        message: 'Success',
        data: {
          message: 'Review deleted successfully'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  @ApiResponse({ status: 404, description: 'Review not found' })
  remove(@Param('id') id: string) {
    return this.reviewService.remove(id);
  }
}
