<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use PickBazar\Enums\WithdrawStatus;

class CreateBillsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bills', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("address");
            $table->string("shop_name");
            $table->string("shop_address");
            $table->string("shop_city");
            $table->double("bill_amount")->default(0);
            $table->double("approved_amount")->default(0);
            $table->string("bill");
            $table->enum('status', [
                WithdrawStatus::APPROVED,
                WithdrawStatus::PROCESSING,
                WithdrawStatus::REJECTED,
                WithdrawStatus::PENDING,
                WithdrawStatus::ON_HOLD,
            ])->default(WithdrawStatus::PENDING);
            $table->integer('user_id');
            $table->text('note')->nullable();
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
        Schema::dropIfExists('bills');
    }
}
