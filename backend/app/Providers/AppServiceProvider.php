<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(\App\Repositories\UserRepositoryInterface::class, \App\Repositories\UserRepository::class);
        $this->app->bind(\App\Repositories\ProductRepositoryInterface::class, \App\Repositories\ProductRepository::class);
        $this->app->bind(\App\Repositories\FeedbackRepositoryInterface::class, \App\Repositories\FeedbackRepository::class);
        $this->app->bind(\App\Repositories\ProductCategoryRepositoryInterface::class, \App\Repositories\ProductCategoryRepository::class);
        $this->app->bind(\App\Repositories\OrderRepositoryInterface::class, \App\Repositories\OrderRepository::class);
        $this->app->bind(\App\Repositories\StoreRepositoryInterface::class, \App\Repositories\StoreRepository::class);
        $this->app->bind(\App\Repositories\FollowRepositoryInterface::class, \App\Repositories\FollowRepository::class);
        $this->app->bind(\App\Repositories\AuthRepositoryInterface::class, \App\Repositories\AuthRepository::class);
        $this->app->bind(\App\Repositories\ProductDetailRepositoryInterface::class, \App\Repositories\ProductDetailRepository::class);
        $this->app->bind(\App\Repositories\VoucherRepositoryInterface::class,\App\Repositories\VoucherRepository::class);
        $this->app->bind(\App\Repositories\ShippingUnitRepositoryInterface::class, \App\Repositories\ShippingUnitRepository::class);
        $this->app->bind(\App\Repositories\UserVoucherInterface::class, \App\Repositories\UserVoucherRepository::class);
        $this->app->bind(\App\Repositories\ShipperRepositoryInterface::class, \App\Repositories\ShipperRepository::class);
        
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
     
    }
}
