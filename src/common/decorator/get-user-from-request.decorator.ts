import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const GetUserFromRequest = createParamDecorator (      

    ( data, ctx: ExecutionContext ) => {

        const req = ctx.switchToHttp( ).getRequest( );
        const user = req.user;

        if ( !user )
            throw new InternalServerErrorException( `User not found ( request )` );

        return user;

    } 

)