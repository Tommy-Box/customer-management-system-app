# ベースイメージ
FROM php:8.2-fpm

# 作業ディレクトリを設定
WORKDIR /var/www/html

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    libpq-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl

# Composerをインストール
COPY --from=composer:2.2 /usr/bin/composer /usr/bin/composer

# ポートを公開
EXPOSE 9000

# 起動コマンド
CMD ["php-fpm"]
