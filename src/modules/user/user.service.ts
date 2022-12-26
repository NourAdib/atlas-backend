import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpUserDto } from '../auth/dto/user-signup.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  /**
   * We use the repository to interact with the database
   * @param usersRepository the user repository that will be injected by the nestjs
   */
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  create(user: SignUpUserDto): Promise<User> {
    console.log(user);

    const newUser = new User();
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.email = user.email;
    newUser.username = user.username;
    newUser.password = user.password;
    newUser.phoneNumber = user.phoneNumber;
    newUser.address = user.address;
    newUser.dateOfBirth = new Date(user.dateOfBirth);

    console.log(typeof newUser.dateOfBirth);
    return this.usersRepository.save(newUser);
  }

  findOneByEmail(email: string): Promise<User> {
    //Look in the users table for one user with the email as the email passed in the parameter
    return this.usersRepository.findOneBy({ email });
  }
}
