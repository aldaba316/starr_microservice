/* eslint-disable prettier/prettier */
import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { LoggerService } from "../../logger/logger.service";

export class AllExceptionFilter implements ExceptionFilter {

    constructor( 

        private loggerService: LoggerService

     ) { }

    catch( exception: any, host: ArgumentsHost ) {

        const ctx = host.switchToHttp( );
        const response = ctx.getResponse( );
        const request = ctx.getRequest( );

        const status = exception instanceof HttpException 
            ? exception.getStatus( )
            : HttpStatus.INTERNAL_SERVER_ERROR;
                        
        const msg = exception instanceof HttpException 
            ? exception.getResponse( ) 
            : exception;   
            
        if ( request.authInfo ) {

            this.loggerService.error( JSON.stringify( { type: request.method, outgoing:'Token error', user:'Token error', api:request.url } ) );
            return response.status( status ).json( { msg } );

        } 

        this.loggerService.error( JSON.stringify( { type: request.method, user:request.user ? request.user.username: 'n/a', api:request.url } ) );
        this.loggerService.error( msg );
        return response.status( status ).json( { msg } );
                                
    };

}