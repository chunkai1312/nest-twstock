import { TwStock } from 'node-twstock';
import { Provider } from '@nestjs/common';
import { TwStockModuleOptions } from './interfaces';
import { TWSTOCK_MODULE_OPTIONS, TWSTOCK_INSTANCE } from './twstock.constants';

export function createTwStockProviders(
  options: TwStockModuleOptions
): Provider[] {
  return [
    {
      provide: TWSTOCK_MODULE_OPTIONS,
      useValue: options,
    },
  ];
}

export const TwStockInstanceProvider = {
  provide: TWSTOCK_INSTANCE,
  useFactory: (options: TwStockModuleOptions) => {
    return new TwStock(options);
  },
  inject: [TWSTOCK_MODULE_OPTIONS],
};
