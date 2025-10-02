
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { resSuccess } from '../utils/succes-response';
import { handleError } from '../utils/hande-error';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {

    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>,
    ) { }

    async create(dto: CreateNotificationDto): Promise<object> {
        try {
            const notification = this.notificationRepository.create(dto);
            const saved = await this.notificationRepository.save(notification);
            return resSuccess({ data: saved });
        } catch (error) {
            handleError(error);
            return resSuccess({ message: 'Notification creation error' });
        }
    }

    async findAll(): Promise<object> {
        try {
            const notifications = await this.notificationRepository.find({
                relations: ['user'],
            });
            return resSuccess({ data: notifications });
        } catch (error) {
            handleError(error);
            return resSuccess({ message: 'Notification list error', data: [] });
        }
    }

    async findOne(id: string): Promise<object> {
        try {
            const notification = await this.notificationRepository.findOne({
                where: { id },
                relations: ['user'],
            });
            if (!notification) throw new NotFoundException('Notification not found');
            return resSuccess({ data: notification });
        } catch (error) {
            handleError(error);
            return resSuccess({ message: 'Notification not found', data: null });
        }
    }
    async update(id: string, dto: any): Promise<object> {
        try {
            const notification = await this.notificationRepository.findOne({ where: { id } });
            if (!notification) throw new NotFoundException('Notification not found');
            Object.assign(notification, dto);
            const updated = await this.notificationRepository.save(notification);
            return resSuccess({ message: 'Notification updated', data: updated });
        } catch (error) {
            handleError(error);
            return resSuccess({ message: 'Notification update error' });
        }
    }
    async remove(id: string): Promise<object> {
        try {
            const notification = await this.notificationRepository.findOne({ where: { id } });
            if (!notification) throw new NotFoundException('Notification not found');
            await this.notificationRepository.remove(notification);
            return resSuccess({ message: 'Notification removed' });
        }
        catch (error) {
            handleError(error);
            return resSuccess({ message: 'Notification removal error' });
        }
    }
}
