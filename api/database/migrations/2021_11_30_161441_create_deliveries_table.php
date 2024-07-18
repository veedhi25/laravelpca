<?php

use PickBazar\Enums\WithdrawStatus;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDeliveriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deliveries', function (Blueprint $table) {
            $table->id();

            $table->integer('user_id');

            $table->string('sender_name');
            $table->string('reciever_name');

            $table->text('pickup_location');
            $table->text('drop_location');

            $table->string('sender_complete_address');
            $table->string('reciever_complete_address');

            $table->string('sender_phone_number');
            $table->string('reciever_phone_number');

            $table->string('package_type');
            $table->string('package_name')->nullable();
            $table->string('package_weight')->nullable();
            $table->integer('package_qty')->nullable();
            $table->string('total_weight')->nullable();
            $table->integer('status')->default(1);

            
            $table->float('amount')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('tracking_number')->unique();
            
            $table->float('distance')->nullable();
            $table->string("shop_id")->nullable();
            $table->integer("is_approved")->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('deliveries');
    }
}

