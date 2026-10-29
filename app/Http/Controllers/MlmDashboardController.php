<?php

namespace App\Http\Controllers;

use App\Models\Commission;
use App\Models\Order;
use App\Models\Plan;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MlmDashboardController extends Controller
{
    public function summary()
    {
        $totalMembers = User::count();
        $activeMembers = User::where('status', 'ACTIVE')->count();
        $totalProducts = Product::where('active', true)->count();
        $totalSales = Order::sum('total');
        $activePlan = Plan::where('status', 'active')->first();

        return response()->json([
            'totalMembers' => $totalMembers,
            'activeMembers' => $activeMembers,
            'pausedMembers' => $totalMembers - $activeMembers,
            'totalProducts' => $totalProducts,
            'totalSales' => (float) $totalSales,
            'activePlan' => $activePlan,
            'generatedAt' => now()->toISOString(),
        ]);
    }

    public function plans()
    {
        return response()->json(Plan::orderBy('created_at')->get());
    }

    public function members()
    {
        return response()->json(
            User::with(['plan', 'sponsor'])->orderBy('created_at')->get()
        );
    }

    public function products()
    {
        return response()->json(
            Product::where('active', true)->orderBy('created_at')->get()
        );
    }

    public function orders()
    {
        return response()->json(
            Order::with(['user', 'product'])->orderBy('created_at')->get()
        );
    }

    public function tree($memberId)
    {
        $member = User::with('sponsor')->findOrFail($memberId);

        $tree = $this->buildDownlineTree($memberId);

        return response()->json([
            'id' => $member->id,
            'firstName' => $member->first_name,
            'lastName' => $member->last_name,
            'email' => $member->email,
            'status' => $member->status,
            'rank' => $member->rank,
            'children' => $tree,
        ]);
    }

    public function commissions($memberId)
    {
        $member = User::with('plan')->findOrFail($memberId);
        $rows = Commission::with(['order', 'plan'])->where('user_id', $memberId)->get();
        $totalCommission = $rows->sum('amount');

        return response()->json([
            'memberId' => $member->id,
            'memberName' => $member->first_name . ' ' . $member->last_name,
            'planName' => $member->plan?->name ?? 'No plan',
            'totalCommission' => (float) $totalCommission,
            'rows' => $rows,
        ]);
    }

    protected function buildDownlineTree($memberId)
    {
        $children = User::where('sponsor_id', $memberId)->get();

        return $children->map(function ($child) {
            return [
                'id' => $child->id,
                'firstName' => $child->first_name,
                'lastName' => $child->last_name,
                'email' => $child->email,
                'status' => $child->status,
                'rank' => $child->rank,
                'children' => $this->buildDownlineTree($child->id),
            ];
        })->values();
    }
}
