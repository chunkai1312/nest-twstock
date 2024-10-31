# nest-twstock

[![NPM version][npm-image]][npm-url]

> A Nest module wrapper for [node-twstock](https://github.com/chunkai1312/node-twstock)

## Installation

To begin using it, we first install the required dependencies.

```bash
$ npm install --save nest-twstock node-twstock
```

## Getting started

Once the installation is complete, import the `TwStockModule` into your module and run the `register()` static method as shown below:

```typescript
import { Module } from '@nestjs/common';
import { TwStockModule } from 'nest-twstock';

@Module({
  imports: [
    TwStockModule.register(),
  ],
})
export class CatsModule {}
```

Next, inject the `TwStock` instance using the `@InjectTwStock()` decorator.

```typescript
import { Injectable } from '@nestjs/common';
import { InjectTwStock } from 'nest-twstock';
import { TwStock } from 'node-twstock';

@Injectable()
export class CatsService {
  constructor(
    @InjectTwStock() private readonly twstock: TwStock,
  ) {}

  async listStocks() {
    return this.twstock.stocks.list();
  }
}
```

## Async configuration

When you need to pass module options asynchronously instead of statically, use the `registerAsync()` method. As with most dynamic modules, Nest provides several techniques to deal with async configuration.

One technique is to use a factory function:

```typescript
TwStockModule.registerAsync({
  useFactory: () => ({
    ttl: 5000,
    limit: 1,
  }),
});
```

Like other factory providers, our factory function can be [async](https://docs.nestjs.com/fundamentals/custom-providers#factory-providers-usefactory) and can inject dependencies through `inject`.

```typescript
TwStockModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    ttl: configService.get('TWSTOCK_TTL'),
    limit: configService.get('TWSTOCK_LIMIT'),
  }),
  inject: [ConfigService],
});
```

Alternatively, you can configure the `TwStockModule` using a class instead of a factory, as shown below.

```typescript
TwStockModule.registerAsync({
  useClass: TwStockConfigService,
});
```

The construction above instantiates `TwStockConfigService` inside `TwStockModule`, using it to create an options object. Note that in this example, the `TwStockConfigService` has to implement `TwStockOptionsFactory` interface as shown below. The `TwStockModule` will call the `createTwStockOptions()` method on the instantiated object of the supplied class.

```typescript
@Injectable()
class TwStockConfigService implements TwStockOptionsFactory {
  createTwStockOptions(): TwStockModuleOptions {
    return {
      ttl: 5000,
      limit: 1,
    };
  }
}
```

If you want to reuse an existing options provider instead of creating a private copy inside the `TwStockModule`, use the `useExisting` syntax.

```typescript
TwStockModule.registerAsync({
  imports: [ConfigModule],
  useExisting: TwStockConfigService,
});
```

## Reference

[node-twstock](https://github.com/chunkai1312/node-twstock)

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/nest-twstock.svg
[npm-url]: https://npmjs.com/package/nest-twstock
