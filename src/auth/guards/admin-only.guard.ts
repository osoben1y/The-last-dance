import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminService } from '../../admin/admin.service';

@Injectable()
export class AdminOnlyGuard implements CanActivate {
  constructor(private readonly adminService: AdminService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      throw new UnauthorizedException('No user found in request');
    }
    if (user.isAdmin) {
      return true;
    }
    if (user.email === process.env.SUPER_ADMIN_EMAIL) {
      return true;
    }
    const admin = await this.adminService.findByEmail?.(user.email);
    if (admin) {
      return true;
    }
    throw new UnauthorizedException('Access denied: Only admin or super-admin');
  }
}
