import { Module } from '@nestjs/common';

//* Controller //
import * as ctrl from './controller';

//* Decorator //
import * as D from './decorator';

//* Providers //
import * as srv from './service';
import { UserService } from '../shared/service/User.service';
import { MicroserviceConnectionService } from '../testLogs/service';

//* Module //

import { sharedModule } from '../shared/shared.module';

@Module( {

    imports: [

        sharedModule

     ],
    controllers: [ 

        ctrl.QuickTestValidatorController

    ],
    providers: [ 

        srv.ValidatorHelperService,
        D.ValidatorVersion,
        UserService,    
        MicroserviceConnectionService

    ],
    exports: [ 

        UserService,
        MicroserviceConnectionService

     ]

} )

export class ValidatorModule { }