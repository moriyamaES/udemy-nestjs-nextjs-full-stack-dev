import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updateUser(
    userId: number,
    dto: UpdateUserDto,
  ): Promise<Omit<User, 'hadhedPassword'>> {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
    // delete user.hadhedPassword;
    delete (user as Partial<User>).hadhedPassword;
    return user;
  }

  // async updateUser(
  //   userId: number,
  //   dto: UpdateUserDto,
  // ): Promise<Omit<User, 'hadhedPassword'>> {
  //   const user = await this.prisma.user.update({
  //     where: {
  //       id: userId,
  //     },
  //     data: {
  //       ...dto, 
  //     },
  //   });
  //   delete user.hadhedPassword;
  //   return user;
  // }
  
}
