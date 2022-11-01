import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth } from "@nestjs/swagger";
import { validRoles } from "../../apps/shared/global/valid-roles";
import { UserRoleGuard } from "../guard/user-role.guard";
import { RoleProtected } from "./role-protected.decorator";

export function Auth( ...roles: validRoles[] ) {

    return applyDecorators (
         //* SET MEATADATA, so the Guard can access to it //
        RoleProtected( ...roles ),
        //* Validate ROL
        UseGuards( AuthGuard('jwt'), UserRoleGuard ),
        //* Swagger bearer option //
        ApiBearerAuth('jwt')
    )


}