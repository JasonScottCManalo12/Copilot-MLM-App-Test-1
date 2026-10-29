<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Plan;
use App\Models\Product;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $sponsorPlan = Plan::create([
            'name' => 'Sponsor Plus',
            'type' => 'SPONSOR_TREE',
            'status' => 'active',
            'description' => 'Product-based sponsor tree with sales and team bonuses.',
            'config' => [
                'retailCommissionRate' => 0.10,
                'teamVolumeBonusRate' => 0.04,
                'minMonthlyPv' => 50,
                'minRetailSales' => 150,
            ],
        ]);

        $root = User::create([
            'first_name' => 'Alice',
            'last_name' => 'Nguyen',
            'email' => 'alice@company.test',
            'plan_id' => $sponsorPlan->id,
            'status' => 'ACTIVE',
            'rank' => 'founder',
            'city' => 'Manila',
            'country' => 'PH',
        ]);

        $team = [
            ['first_name' => 'Bob', 'last_name' => 'Jones', 'email' => 'bob@company.test', 'status' => 'ACTIVE', 'rank' => 'consultant', 'city' => 'Cebu', 'country' => 'PH'],
            ['first_name' => 'Cora', 'last_name' => 'Smith', 'email' => 'cora@company.test', 'status' => 'ACTIVE', 'rank' => 'consultant', 'city' => 'Davao', 'country' => 'PH'],
            ['first_name' => 'Derek', 'last_name' => 'Lee', 'email' => 'derek@company.test', 'status' => 'ACTIVE', 'rank' => 'senior', 'city' => 'Bacolod', 'country' => 'PH'],
        ];

        foreach ($team as $member) {
            User::create([
                ...$member,
                'sponsor_id' => $root->id,
                'plan_id' => $sponsorPlan->id,
            ]);
        }

        Product::create([
            'name' => 'Wellness Starter Pack',
            'sku' => 'WELL-START',
            'price' => 129.00,
            'pv' => 25,
            'bv' => 20,
            'commission_rate' => 0.10,
            'active' => true,
        ]);

        Product::create([
            'name' => 'Daily Vitality Kit',
            'sku' => 'VITAL-KIT',
            'price' => 249.00,
            'pv' => 45,
            'bv' => 40,
            'commission_rate' => 0.12,
            'active' => true,
        ]);
    }
}
