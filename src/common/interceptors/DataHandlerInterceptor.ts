import { NestInterceptor, Injectable, CallHandler, ExecutionContext } from '@nestjs/common';
import { Observable, tap, timeout } from 'rxjs';

import { LoggerService } from '../../logger/logger.service';

@Injectable( )
export class DataHandlerInterceptor implements NestInterceptor {

    constructor( private readonly loggerService: LoggerService ) {}

    intercept( context: ExecutionContext, next: CallHandler<any> ): Observable<any> | Promise<Observable<any>> {

        const req = context.switchToHttp( ).getRequest( );

        const payload = {

            method: req.method, 
            body: req.body, 
            params: req.params,
            query: req.query,
            user: req.user, 
            url:req.url

        };
        
        this.loggerService.log( JSON.stringify( payload ) );
        
        return next.handle().pipe(
            timeout ( 30000 ),
            tap( ( data ) => this.loggerService.log( JSON.stringify( data ) ) )
        );

    }  

};