import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, BadRequestException,UploadedFile, UseInterceptors} from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from './entities/user.entity';
import { multerConfig } from '../config/multer.config';
import * as xlsx from 'xlsx';
import { Express } from 'express';
import { Multer } from 'multer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatedUser: Partial<User>): Promise<User> {
    return this.usersService.update(+id, updatedUser);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.usersService.delete(+id);
  }

  @Post('bulk-upload')
  @UseInterceptors(FileInterceptor('file'))
  async bulkUpload(@UploadedFile() file: Multer.File) {
  if (!file) {
    throw new BadRequestException('No file uploaded');
  }

  try {
    console.log('Uploaded file:', file);
    console.log("hiii")
    console.log('File Buffer:', file.buffer); 
  console.log('File Mime Type:', file.mimetype);

    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    console.log('Workbook Sheet Names:', workbook.SheetNames);

    const sheetName = workbook.SheetNames[0];
    console.log('Sheet Name:', sheetName);

    const sheet = workbook.Sheets[sheetName];
    console.log('Sheet Data:', sheet);

    const data = xlsx.utils.sheet_to_json(sheet); 
    console.log('Data from Excel:', data);

    const users = await this.usersService.createBulkUsers(data);
    return { message: 'Users created successfully', users };
  } catch (error) {
    console.error('Error processing file:', error);
    throw new BadRequestException(`Failed to process file: ${error.message}`);
  }
}
}