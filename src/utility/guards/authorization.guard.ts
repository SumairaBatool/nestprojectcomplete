import {
    
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    ForbiddenException,
    mixin,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
import { CanActivate } from '@nestjs/common';
import { CurrentUser } from './../decorators/current-user.decorator';
import { Roles } from 'src/utility/common/user-role.enum';

  // @Injectable()
  // export class AuthorizeGuard implements CanActivate {
  //   constructor(private reflector: Reflector) {}
  
  //   canActivate(context: ExecutionContext): boolean {
  //     const allowedRoles = this.reflector.get<string[]>(
  //       'allowedRoles',
  //       context.getHandler()
  //     );
  
  //     const request = context.switchToHttp().getRequest();
  //     const user = request.currentUser;
  
  //     // If no roles were set via @Roles(), allow by default
  //     if (!allowedRoles || allowedRoles.length === 0) {
  //       return true;
  //     }
  
  //     if (!user) {
  //       throw new UnauthorizedException('User not logged in.');
  //     }
  
  //     const userRoles = user.roles || [];
  
  //     const hasPermission = userRoles.some((role: string) =>
  //       allowedRoles.includes(role)
  //     );
  
  //     if (!hasPermission) {
  //       throw new ForbiddenException('You do not have permission to access this resource.');
  //     }
  
  //     return true;
  //   }
  // }
  



  export const AuthorizeGuard = (allowedRoles: string[]) => {
    class RolesGuardMixin implements CanActivate {
      canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.currentUser;
  
        if (!user) {
          throw new UnauthorizedException('User not logged in.');
        }
  
        const result = user?.roles
          .map((role: string) => allowedRoles.includes(role))
          .find((val: boolean) => val === true);
  
        if (result) return true;
  
        throw new ForbiddenException('You are not authorized to access this resource.');
      }
    }
  
    return mixin(RolesGuardMixin);
  };
  