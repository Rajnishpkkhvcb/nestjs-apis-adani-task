// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersController } from './users.controller';
// import { UsersService } from './users.service';
// import { User } from './entities/user.entity';

// @Module({
//   imports: [TypeOrmModule.forFeature([User])], // Ensure User entity is registered
//   controllers: [UsersController], // Ensure UsersController is registered
//   providers: [UsersService], // Ensure UsersService is registered
// })
// export class UsersModule {}


import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}