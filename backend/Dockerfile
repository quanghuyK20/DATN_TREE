FROM php:8.1-fpm

# Arguments defined in docker-compose.yml
ARG user
ARG uid

COPY --from=composer /usr/bin/composer /usr/bin/composer
COPY composer.json composer.json

# Install extension
RUN docker-php-ext-install pdo pdo_mysql
# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /datn/backend
COPY . .
EXPOSE 8000
# USER $user
# RUN 

# CMD composer install --no-interaction && php artisan migrate && php artisan db:seed && php artisan serve --host=0.0.0.0

CMD composer install --no-interaction && php artisan serve --host=0.0.0.0 && composer require predis/predis