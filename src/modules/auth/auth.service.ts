import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class AuthService {
    constructor( @InjectRepository(User) private userRepository: Repository<User>, private jwtService: JwtService) {}

    async findByAttribute(attribute: Record<string, any>): Promise<User | null> {
        return await this.userRepository.findOne({ where: attribute });
    }

    async create(body: Record<string, any>): Promise<User> {
        const user = this.userRepository.create(body);
        return await this.userRepository.save(user);
    }
}
