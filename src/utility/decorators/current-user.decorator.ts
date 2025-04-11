import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from 'express';

export const CurrentUser=createParamDecorator(
    (data:never, ctx:ExecutionContext)=>{
        const request=ctx.switchToHttp().getRequest();
        return request.currentUser
    }
)