import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourseOptions } from 'db/data-source';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './utility/middleware/current-user.middleware';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourseOptions), UsersModule, CategoryModule, ProductsModule, ReviewsModule],
  controllers: [],
  providers: [],
})
export class AppModule {

  //midleware authentication for all routes
  configure(consumer:MiddlewareConsumer){
    consumer
    .apply(LoggerMiddleware)
    .forRoutes({path:'*',method:RequestMethod.ALL})
  }


}
