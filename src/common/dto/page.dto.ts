import { IsArray } from 'class-validator';
import { PageMetaDto } from './page-meta.dto';

/**
 * PageDto
 * @description Data transfer object for paginated data
 */
export class PageDto<T> {
  @IsArray()
  readonly data: T[];

  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
