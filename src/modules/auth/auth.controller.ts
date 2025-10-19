import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LoginDto } from './Dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBaseResponse } from '../../common/dto/apiresponses.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
  ): Promise<ApiBaseResponse> {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );

    if (!user) {
      return new ApiBaseResponse('user not found', 404, '');
    }
    var loginHistoryInfo = await this.authService.getUserInfo(req, user); // TODO
    const token = await this.authService.createToken(user);
    const data = {
      userId: user.userId,
      username: user.username,
      firstName: user.email,
      isActive: user.isActive,
      token: token,
    };
    return new ApiBaseResponse('Login Successfully', 200, data);
  }
}
