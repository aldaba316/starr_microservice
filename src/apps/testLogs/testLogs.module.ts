/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

//* Mongo Connection //
import { MongoConnectionService } from '../../mongo-connection/mongo-connection.service';
import { MongoConnectionModule } from '../../mongo-connection/mongo-connection.module';

//* Controller // 
import * as ctrl from './controller';

//* Providers //
import * as srv from './service';
import { UserService } from '../shared/service/User.service';  
import { sharedModule } from '../shared/shared.module';

//* Schemas //
import * as S from './schema/';

//* Interface //
import * as I from './interface';

//* Rules //
import * as D from './decorator';

@Module({
    controllers: [

        ctrl.FailsController,
        ctrl.UutLogsController

    ],
    providers: [
        
        D.ValidTest,

        srv.FailsService,
        srv.MainUUTService,
        srv.MacAddressService, 
        srv.MicroserviceConnectionService,
        // NodeService,
        UserService,
        {
            provide: 'MAC_ADDRESS',
            useFactory: ( db: MongoConnectionService ) => db.getConnection( ).model<I.MacAddressInterface>( 'MAC_ADDRESS', S.MacAddressSchema , 'MAC_ADDRESS' ),
            inject : [ MongoConnectionService ]
        },
        {
            provide: 'FAILS',
            useFactory: ( db: MongoConnectionService ) => db.getConnection( ).model<I.FailsInterface>( 'FAILS', S.failsSchema, 'FAILS' ),
            inject : [ MongoConnectionService ]
        },
        {
            provide: 'QuickTest',
            useFactory: ( db: MongoConnectionService ) => db.getConnection( ).model<I.UutLogInterface>( 'QuickTest', S.UutLogSchema, 'QuickTest' ),
            inject : [ MongoConnectionService ]
        },
        {
            provide: 'FunctionalTest',
            useFactory: ( db: MongoConnectionService ) => db.getConnection( ).model<I.UutLogInterface>( 'FunctionalTest', S.UutLogSchema, 'FunctionalTest' ),
            inject : [ MongoConnectionService ]
        },
        {
            provide: 'StressTest',
            useFactory: ( db: MongoConnectionService ) => db.getConnection( ).model<I.UutLogInterface>( 'StressTest', S.UutLogSchema, 'StressTest' ),
            inject : [ MongoConnectionService ]
        }
    ],
    imports: [ 

        MongoConnectionModule,
        sharedModule

     ]
})
 
export class testLogsModule {}