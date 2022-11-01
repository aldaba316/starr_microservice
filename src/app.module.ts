/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */

const os = require( 'os' );

const networkInterfaces = os.networkInterfaces( );

import { MiddlewareConsumer, Module } from '@nestjs/common';

// configuration ( environment )
import { ConfigModule, ConfigService } from '@nestjs/config';
import configurationLogin from './configuration/configuration-login';
import configuration from './configuration/configuration';

// sockets
import { AppGateway } from './app.gateway';

// Service //
import { PostRequestService } from './apps/shared/global/postRequest.service';
import { AppService } from './app.service';

// connection to database
import { MongoConnectionModule } from './mongo-connection/mongo-connection.module';

//* Modules //
import { foxApi_V2Module } from './apps/foxApi_V2/foxApi_V2.module';

// import { FoxAPiModule } from './apps/foxAPi/foxAPI.module';
// import { RaxcanModule } from './apps/raxcan/raxcan.module';
import { testLogsModule } from './apps/testLogs/testLogs.module';
import { RepairSystemModule } from './apps/repairSystem/repairSystem.module';
import { ValidatorModule } from './apps/validator/validator.module';
import { sharedModule } from './apps/shared/shared.module';

//* Logger //
import { LoggerModule } from './logger/logger.module';

//* Cron jobs //
import { CronModule } from './cron/cron.module';

//* microservices //
import { MicroserviceConnectionModule } from './microservice-connection/microservice-connection.module';

//* Example //
import { AppController } from './app.controller';

//* Middlewares //
import { GetUserMiddleware } from './apps/repairSystem/middleware/GetUser.middleware';

require( 'dotenv' ).config( );

@Module({
  imports: [
    MongoConnectionModule,
    ConfigModule.forRoot( {
      load: [ configuration, configurationLogin ],
      envFilePath: `./env/${ process.env.NODE_ENV }.env`,
      isGlobal: true
    } ),
    LoggerModule,
    CronModule,
    MicroserviceConnectionModule,
    foxApi_V2Module,
    sharedModule,
    // FoxAPiModule,
    // RaxcanModule,
    testLogsModule,
    RepairSystemModule,
    ValidatorModule
  ],
  controllers: [ AppController ], 
  providers: [
    AppGateway,
    AppService,
    PostRequestService
  ], 
  exports: [ 
      LoggerModule, 
      PostRequestService
  ]
})

export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GetUserMiddleware).forRoutes('/')
  }

  static port: number;
  static microservice_port: number;
  static queue: string;
  static serverIP: number;

  constructor( private readonly configService: ConfigService ) {
    

    AppModule.port = this.configService.get( 'mongo.runnin_port' );
    AppModule.microservice_port = this.configService.get( 'mongo.microservice_port' );
    AppModule.queue = this.configService.get( 'mongo.database' );
    AppModule.serverIP = networkInterfaces.eno1[ 0 ].address;

  }
 
}
