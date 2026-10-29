# Laravel MLM Starter

This branch is set up for a Laravel 11/12 implementation of a legitimate product-based MLM platform using:

- Laravel 11/12
- PostgreSQL
- Breeze or Jetstream auth
- Livewire or React admin UI

## Stack selected

- Backend: Laravel
- Database: PostgreSQL
- Authentication: Breeze (recommended for a clean starter)
- Admin UI: Livewire (recommended for a simple admin dashboard)

## Quick start

1. Install PHP dependencies:
   composer install

2. Copy environment:
   cp .env.example .env

3. Create PostgreSQL database:
   createdb mlm_app_test_1

4. Generate application key:
   php artisan key:generate

5. Run migrations and seed data:
   php artisan migrate --seed

6. Start the app:
   php artisan serve

## Core features modeled

- Users and sponsor relationships
- Plans and plan versions
- Products and sales orders
- Commission records
- Payout batches
- Team tree logic
- Dashboard summary endpoint

## Next recommended steps

- Install Breeze with `php artisan breeze:install`
- Or install Jetstream if a more feature-rich admin is desired
- Add Livewire admin dashboard pages for members, tree, payouts, and rank tracking
- Add compliance and audit logging
- Add plan-switching support using config-driven plan versions

## Important note

This is a legitimate, product-based distributor/referral starter, designed to avoid recruitment-only compensation patterns and keep calculations transparent and auditable.
