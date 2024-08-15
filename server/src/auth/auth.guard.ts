import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { jwtConstants } from "./constants";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService:JwtService,) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
        throw new UnauthorizedException();
    }
    try {
        const payload = this.jwtService.verify(token,{secret:jwtConstants.secret});
        //TODO: control jwt on backend and new backend
      return true;
    } catch (error) {
        throw new UnauthorizedException();
    }
    }


    private extractTokenFromHeader(request: Request): string {
        const authHeader = request.headers.authorization;
        const [type, token] = authHeader.split(' ')??[];
        if (type !== 'Bearer') {
            return undefined;
        }
        return token;
    }
}