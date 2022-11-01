/* eslint-disable prettier/prettier */
import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { META_ROLES } from "../decorator/role-protected.decorator";
import { UserService } from "../../apps/shared/service/User.service";

@Injectable( )

export class UserRoleGuard implements CanActivate {

    constructor( 

        private readonly reflector: Reflector,
        private readonly userService: UserService

     ) { }

    async canActivate( context: ExecutionContext ): Promise<any> {

        //? @Auth( validRoles.dev ) 
        const validRoles: string[ ] = this.reflector.get( META_ROLES, context.getHandler( ) );

        //! Forzar a tener un rol alv //
        if ( !validRoles ) 
            throw new ForbiddenException( `Empty role` );

        if ( validRoles.length === 0 ) 
            throw new ForbiddenException( `Empty role` );

        const req = context.switchToHttp( ).getRequest( );

        const userID = req.user;

        const { _roles, username } = await this.userService._getUser( userID );

        if ( !_roles.length ) 
            throw new BadRequestException( 'User need a role' );

        const validRole = _roles.find( ( { role } ) => {

            if ( validRoles.includes( role ) ) {

                return role;

            };
            
        } );

        if ( !validRole ) 
            throw new ForbiddenException( `User ${ username } needs a valid role ${ validRoles }` );

        return true;

    }

}