import { Inject } from '@nestjs/common';
import { TWSTOCK_INSTANCE } from '../twstock.constants';

export const InjectTwStock = (): ParameterDecorator => {
  return Inject(TWSTOCK_INSTANCE);
};
