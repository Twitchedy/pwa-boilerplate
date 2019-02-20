## Laravel/VueJS Boilerplate

Laravel API with a VueJS SPA frontend. The frontend includes routing (vue-router), stores (vuex), and linting (eslint).

## Install

### Get the code
Clone the repo, delete the git data, and compile the code:

```
git clone https://github.com/Twitchedy/laravel-vuejs-spa-boilerplate.git src
cd src
rm -rf .git
composer install
yarn
yarn dev
```

### Set up environment
You'll also have to populate the .env file:

```
cp .env.example .env
php artisan key:generate
php artisan jwt:secret
php artisan migrate --seed
```

### Host it
Host the project using Laravel Homestead or Valet.
