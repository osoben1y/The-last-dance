import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { LoyaltyModule } from './loyalty/loyalty.module';
import { PaymentsModule } from './payments/payments.module';
import { CountryModule } from './countries/country.module';
import { BookingModule } from './booking/booking.module';
import { NotificationsModule } from './notifications/notifications.module';
import { BaggageModule } from './baggage/baggage.module';
import { AirportModule } from './airports/airport.module';
import { ClassModule } from './classes/class.module';
import { CityModule } from './cities/city.module';
import { PlaneModule } from './planes/plane.module';
import { CompanyModule } from './companies/company.module';
import { SeatModule } from './seats/seat.module';
import { FlightModule } from './flight/flight.module';
import { ReviewModule } from './reviews/review.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AdminModule,
    AuthModule,
    LoyaltyModule,
    PaymentsModule,
    BookingModule,
    CountryModule,
    NotificationsModule,
    BaggageModule,
    AirportModule,
    ClassModule,
    NotificationsModule,
    CityModule,
    PlaneModule,
    CompanyModule,
    SeatModule,
    FlightModule,
    ReviewModule,
    NewsModule
  ],
})
export class AppModule { }
