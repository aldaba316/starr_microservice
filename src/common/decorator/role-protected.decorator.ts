/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SetMetadata } from "@nestjs/common";

export const META_ROLES = 'roles';

export const RoleProtected = ( ...args: string[] ) => {

    return SetMetadata( META_ROLES, args );

}