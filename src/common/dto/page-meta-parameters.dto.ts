import { PageOptionsDto } from './page-options.dto';

/**
 * PageMetaDtoParameters
 * @description Page meta parameters, used to generate page meta
 */
export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}
