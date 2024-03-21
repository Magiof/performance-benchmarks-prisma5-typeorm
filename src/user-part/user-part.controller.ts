import { Controller } from '@nestjs/common';
import { UserPartService } from './user-part.service';

@Controller('user-part')
export class UserPartController {
  constructor(private readonly userPartService: UserPartService) {}
}
