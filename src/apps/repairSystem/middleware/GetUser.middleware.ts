
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class GetUserMiddleware implements NestMiddleware {

    constructor( ) { }

    use ( req: Request, res: Response, next: NextFunction ) {

        // console.log('GetUserMiddleware');

        // console.log( req.body );
    
        // res.status( 409 ).json( { 


        //     "msg": {
        //         "statusCode": 409,
        //         "message": [
                    
        //             'Lo trono el middleware'
        //         ],
        //         "error": "Bad Request",
        //         "level": "error",
        //         "timestamp": "2022-08-17 09:18:44"
        //       }

        //  } );

        next();

    }
}