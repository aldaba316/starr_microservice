/* eslint-disable prettier/prettier */
declare const module: any;
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//* swagger ( docs  )//
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

//* Microservices conn //
import { Transport } from '@nestjs/microservices';

//* Loggger //
import { LoggerService } from './logger/logger.service';

//* Decorator validations //
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

//* Filter //
import { AllExceptionFilter } from './common/filters/http-exception.filter';

import { TimeOutInterceptor, DataHandlerInterceptor } from './common/interceptors/';

async function bootstrap( ) {

  const app = await NestFactory.create( AppModule, { logger: new LoggerService( ) } );

  app.useGlobalPipes( new ValidationPipe( { whitelist: true, forbidNonWhitelisted: true } ) );
  app.enableCors( );
  app.useGlobalFilters( new AllExceptionFilter( new LoggerService ) );
  app.useGlobalInterceptors( new TimeOutInterceptor( ), new DataHandlerInterceptor( new LoggerService ) );
  app.connectMicroservice( {

    transport : Transport.TCP,
    options : { host: AppModule.serverIP, port: AppModule.microservice_port }

  } );

  // app.connectMicroservice( {

  //   transport: Transport.RMQ,
  //   options: {
  //       urls: [ 'amqps://aplkysun:vT7RBW9Fl-7OzDmeAb0mk7mW-Ukz80Kb@hawk.rmq.cloudamqp.com/aplkysun' ],
  //       queue: AppModule.queue
  //   }

  // } );

  useContainer( app.select( AppModule ), { fallbackOnErrors: true } );
 
  //* Swagger //
  const config = new DocumentBuilder( )
    .setTitle('FOXCODE STARR!')
    .setDescription( 'ENV : ' + AppModule.queue)
    .setVersion('1.0')
    .addBearerAuth( { bearerFormat: 'JWT', type: 'http' }, 'jwt' ) .build( );

  const document = SwaggerModule.createDocument( app, config );
  SwaggerModule.setup( 'api', app, document, { swaggerOptions: { filter: true } });

  await app.listen( AppModule.port );
  await app.startAllMicroservices( );

  if ( module.hot ) {

    module.hot.accept( );
    module.hot.dispose( ( ) => app.close( ) );
    
  };

}

bootstrap( );


