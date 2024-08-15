import { ApiProperty } from '@nestjs/swagger';
import { ResponseMessageType } from './enums/response-messageType.enum';

class Property {
  @ApiProperty({ type: Number })
  total: number;

  @ApiProperty({ type: Number })
  page: number;

  @ApiProperty({ type: Number })
  limit: number;
}

export class PaginatedResponse<T> {
  @ApiProperty({ type: Property })
  property: Property;

  @ApiProperty({ type: Array, isArray: true })
  data: T[];

  @ApiProperty({ type: ResponseMessageType, example: "Success" })
  message:ResponseMessageType ;

  constructor(data: T[], total: number, page: number, limit: number, message: ResponseMessageType = ResponseMessageType.SUCCESS) {
    this.property = { total, page, limit };
    this.data = data;
    this.message = message;
  }
}
