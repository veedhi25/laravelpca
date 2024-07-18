<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMasterProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('master_products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string("slug")->nullable();
            $table->text("description")->nullable();
            $table->unsignedBigInteger("type_id")->nullable();
            $table->double("price")->default("0.00");
            $table->double("sale_price")->nullable();
            $table->string('sku')->nullable();
            $table->integer('quantity')->default(0);
            $table->integer("in_stock")->default(1);
            $table->integer("is_taxable")->default(0);
            $table->unsignedBigInteger('shipping_class_id')->nullable();
            $table->enum("status",['publish','draft'])->default("publish");
            $table->enum("product_type",["simple",'variable'])->default("simple");
            $table->string("unit")->nullable();
            $table->string("height")->nullable();
            $table->string("width")->nullable();
            $table->string("length")->nullable();
            $table->json("image")->nullable();
            $table->json("gallery")->nullable();
            $table->double("max_price")->nullable();
            $table->double("min_price")->nullable();
            $table->integer("is_featured")->default(0);
            $table->timestamp('deleted_at')->nullable();
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
        Schema::dropIfExists('master_products');
    }
}
