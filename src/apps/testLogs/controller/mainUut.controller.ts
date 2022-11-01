import { Body, Controller, Post } from '@nestjs/common';

//* swagger Doc //
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

//* Logger //
import { LoggerService } from '../../../logger/logger.service';

//* Service //
import { MainUUTService } from '../service';
import { UserService } from '../../shared/service/User.service';

//* DTO //
import { UutLogsDTO } from '../dto';

//* Interface //
import { UutLogInterface } from '../interface/';
import { UserInterface } from '../../../../../user_microservice/src/apps/user/interface/user.interface';

//* Decorator //
import { Auth, GetUserFromRequest, ResponseDecorator } from '../../../common/decorator';

//* Global //
import { validRoles } from '../../shared/global/valid-roles';

//* Mongoose //
import { Types } from 'mongoose';

@Controller('api/v1/testLogs/main_uut')
@ApiTags('Main UUT')

export class UutLogsController {

    constructor(

        private readonly loggerService: LoggerService,
        private readonly _MainUUTService: MainUUTService,
        private readonly userService: UserService

    ) { }

    //! POST UUT LOG //
   @Auth( validRoles.dev )
   @ResponseDecorator( )
   @Post( '/' )
   @ApiOperation( {
       description: 'POST UUT LOG',
   })
   @ApiBody( {
       description: "POST PASS/FAIL Testlogs [ 'QuickTest', 'FunctionalTest', 'StressTest' ]",
       type: UutLogsDTO,
       examples: {
           example1 : {
               value: {
                strTestLog: 'INIT_MXX2290468_20220716131625_PASS.log',
                strStatus: 'PASS',
                strSerialMainBoard: 'strSerialMainBoard example',
                strAssetTagNode: 'strNodeAssetTag example',
                strSerialChassis: 'strSerialChassis example',
                strPxebootServer: 'strPxebootServer example',
                strPartNumber: 'strPartNumber example',
                strProductVersion: 'strProductVersion example',
                strBoardProduct: 'strBoardProduct example',
                strSKU: 'strSKU example',
                strSerialNode: 'strSerialNode example',
                dtStartTime: '2022-07-11T15:03:15.991Z',
                dtEndTime: '2022-07-11T15:03:15.991Z',
                strPath: 'strPath example',
                strFolder: '_QuickTest',
                strFailDescription: 'strFailDescription example',
                strErrorCode: 'strErrorCode example',
                _macAddress_: [ { macAddress: '3D:F2:C9:A6:B3:4F' } ]
              }
           }
       }
   } )
   public async _postUutLog( @GetUserFromRequest( ) userID: Types.ObjectId, @Body( ) UutLogsDTO: UutLogsDTO ): Promise<UutLogInterface> {

       const user: UserInterface = await this.userService._getUser( userID );
       this.loggerService.log( JSON.stringify( { type: 'POST', ingoing: UutLogsDTO, user:user.username, api:'/api/v1/testLogs/main_uut' } ) );
       const response = await this._MainUUTService._postUutLog( UutLogsDTO );
       this.loggerService.log( JSON.stringify( { type: 'POST', outgoing: response, user:user.username, api:'/api/v1/testLogs/main_uut' } ) );
       return response;

   };

};