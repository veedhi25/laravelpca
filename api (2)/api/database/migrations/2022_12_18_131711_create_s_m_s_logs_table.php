<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSMSLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('s_m_s_logs', function (Blueprint $table) {
            $table->id();
            $table->string('phone_number');
            $table->double('order_tracking_number');
            $table->unsignedBigInteger('order_id')->nullable();
            $table->double('status');
            $table->foreign('customer_id')->references('id')->on('users');
            $table->double('username');
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
        Schema::dropIfExists('s_m_s_logs');
    }
}
