import { isUUID } from "class-validator";
import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class CheckUUIDPipe implements PipeTransform {
  transform(value: string) {
    if (!isUUID(value)) {
      throw new BadRequestException(`Invalid ID found: ${value}.`);
    }
    return value;
  }
}
