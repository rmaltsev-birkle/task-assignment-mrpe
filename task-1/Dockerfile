FROM php:8.4-cli

# Install dependencies
RUN apt-get update && apt-get install -y \
  zip \
  unzip

# Install PHP extensions
RUN docker-php-ext-install pcntl

# Install Xdebug
RUN pecl install xdebug && docker-php-ext-enable xdebug

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN composer install

# Default command
CMD ["./vendor/bin/phpunit"]