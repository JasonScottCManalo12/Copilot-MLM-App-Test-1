# Copilot MLM App Test 1

This branch contains the Node.js implementation of the project.

Stack:
- Node.js
- Express.js
- PostgreSQL
- Prisma

Project purpose:
- Legitimate product-based distributor/referral system
- Sponsor/downline tree logic
- Product catalog and order tracking
- Commission calculations
- Payout and summary reporting

Branch layout:
- `nodejs-stacks` — Node.js + Express + PostgreSQL + Prisma implementation
- `laravel-stacks` — Laravel 11/12 implementation using PostgreSQL and auth/admin stack options
- `main` — minimal repository landing page / overview

## Getting started

1. Install dependencies:
   npm install

2. Create PostgreSQL database:
   createdb mlm_app_test_1

3. Copy environment file:
   cp .env.example .env

4. Run Prisma migration / seed:
   npx prisma generate
   npx prisma db push
   npm run seed

5. Start the app:
   npm run dev

## Notes

This is structured as a compliant, product-based MLM platform that emphasizes transparent sales and auditable compensation logic rather than recruitment-only incentives.
