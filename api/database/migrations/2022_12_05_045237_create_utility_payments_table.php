<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUtilityPaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('utility_payments', function (Blueprint $table) {
            $table->id();
            $table->string('tracking_number')->unique();
            $table->unsignedBigInteger('customer_id');
            $table->string('customer_contact');
            $table->string('circle');
            $table->string('operator');
            $table->unsignedBigInteger('status');
            $table->double('amount');
            $table->double('total');
            $table->unsignedBigInteger('coupon_id')->nullable();
            $table->double('discount')->nullable();
            $table->string('payment_id')->nullable();
            $table->string('payment_gateway')->nullable();
            $table->timestamps();
            $table->foreign('status')->references('id')->on('order_status');
            $table->foreign('customer_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('utility_payments');
    }
}
