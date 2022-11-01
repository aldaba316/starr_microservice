import { Body, Controller, Post } from '@nestjs/common';

//* swagger Doc //
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

//* Logger //
import { LoggerService } from '../../../logger/logger.service';

//* Service //
import { UserService } from '../../shared/service/User.service';

//* DTO //
import * as D from '../dto';

//* Interface //
// import { UutLogInterface } from '../interface/';
import { UserInterface } from '../../../../../user_microservice/src/apps/user/interface/user.interface';

//* Decorator //
import { Auth, GetUserFromRequest, ResponseDecorator } from '../../../common/decorator';

//* Global //
import { validRoles } from '../../shared/global/valid-roles';

//* Mongoose //
import { Types } from 'mongoose';
import { ValidatorHelperService } from '../service';

@Controller('api/v1/Validator')
@ApiTags('Test Validator')

export class QuickTestValidatorController {

    constructor(

        private readonly loggerService: LoggerService,
        private readonly userService: UserService,
        private readonly validatorHelperService: ValidatorHelperService

    ) { }

  //! Validate array serialNumber //
  // @Auth( validRoles.dev )
  @ResponseDecorator( )
  @ApiOperation( {
      description: 'Validate array serialNumber, QuickTest, FunctionalTest, StressTest must be passed and the event must be correct ( pending... )',
  })
  @ApiBody( {
      description: 'Data example',
      type: D.array_ssnDTO,
      examples: {
          ejemplo1 : {
              value: {
                'arraySSN': [ { 'SSN': 'HPM2M005EVC1' } ],
                'version': 'QuickTest'
              }
          }
      }
  } ) 
  @Post( '/' )
  public async findAll_quickTestValidator ( 
    /*@GetUserFromRequest( ) userID: Types.ObjectId,*/ 
    @Body( ) array_ssnDTO: D.array_ssnDTO  ): Promise<any> {

    if ( array_ssnDTO.version == 'QuickTest' )  {

      return this.validatorHelperService.findAll_quickTestValidator( array_ssnDTO, [ '_QuickTest' ] );

    };

    return this.validatorHelperService.findAll_quickTestValidator( array_ssnDTO, [ '_FunctionalTest', '_StressTest' ] );

  };

};