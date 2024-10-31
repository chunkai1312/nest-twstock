import { ModuleMetadata, Type } from '@nestjs/common';

export interface TwStockModuleOptions {
  ttl: number;
  limit: number;
}

export interface TwStockOptionsFactory {
  createTwStockOptions(): Promise<TwStockModuleOptions> | TwStockModuleOptions;
}

export interface TwStockModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<TwStockOptionsFactory>;
  useClass?: Type<TwStockOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<TwStockModuleOptions> | TwStockModuleOptions;
  inject?: any[];
}
