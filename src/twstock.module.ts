import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import { TWSTOCK_MODULE_OPTIONS } from './twstock.constants';
import { createTwStockProviders, TwStockInstanceProvider } from './twstock.providers';
import { TwStockModuleOptions, TwStockModuleAsyncOptions, TwStockOptionsFactory } from './interfaces';

@Module({})
export class TwStockModule {
  static register(options: TwStockModuleOptions): DynamicModule {
    const providers = [
      ...createTwStockProviders(options),
      TwStockInstanceProvider,
    ];
    return {
      module: TwStockModule,
      providers,
      exports: providers,
    };
  }

  static registerAsync(options: TwStockModuleAsyncOptions): DynamicModule {
    const providers = [
      ...this.createAsyncProviders(options),
      TwStockInstanceProvider,
    ];
    return {
      module: TwStockModule,
      imports: options.imports || [],
      providers,
      exports: providers,
    };
  }

  private static createAsyncProviders(
    options: TwStockModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<TwStockOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: TwStockModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: TWSTOCK_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    const inject = [
      (options.useClass || options.useExisting) as Type<TwStockOptionsFactory>,
    ];
    return {
      provide: TWSTOCK_MODULE_OPTIONS,
      useFactory: async (optionsFactory: TwStockOptionsFactory) =>
        await optionsFactory.createTwStockOptions(),
      inject,
    };
  }
}
