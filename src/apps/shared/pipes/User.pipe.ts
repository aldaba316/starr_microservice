import { Injectable, PipeTransform } from '@nestjs/common';
import { UserService } from '../service/User.service';

@Injectable()
export class GetUserIDPipe implements PipeTransform<string> {

    constructor( 

        private readonly userService: UserService

    ) { }

  async transform( value ): Promise<void>{
      
     await this.userService._getUser( value );

     return value;
  
  };
}