<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInitialTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user', function(Blueprint $table) {
            $table->increments('id');
            $table->string('name')->default('');
            $table->string('email')->default('');
            $table->string('slug')->default('');
        });

        Schema::create('menu', function(Blueprint $table) {
            $table->increments('id');
            $table->string('name')->default('');
            $table->string('slug')->default('');
            $table->timestamps();
            $table->integer('user_id')->unsigned()->default(0);

            $table->foreign('user_id')->references('id')->on('user')->onDelete('cascade');
        });

        Schema::create('dish_category', function(Blueprint $table) {
            $table->increments('id');
            $table->string('name')->default('');
            $table->integer('menu_id')->unsigned()->default(0);

            $table->foreign('menu_id')->references('id')->on('menu')->onDelete('cascade');

        });

        Schema::create('dish', function(Blueprint $table) {
            $table->increments('id');
            $table->string('name')->default('');
            $table->string('description')->default('');
            $table->integer('price')->unsigned()->default(0);
            $table->integer('category_id')->unsigned()->nullable()->default(0);
            $table->integer('menu_id')->unsigned()->default(0);

            $table->foreign('category_id')->references('id')->on('dish_category');
            $table->foreign('menu_id')->references('id')->on('menu')->onDelete('cascade');
        });

        Schema::create('dish_option', function(Blueprint $table) {
            $table->increments('id');
            $table->string('name')->default('');
            $table->string('description')->default('');
            $table->integer('dish_id')->unsigned()->default(0);

            $table->foreign('dish_id')->references('id')->on('dish')->onDelete('cascade');
        });

        Schema::create('dish_option_value', function(Blueprint $table) {
            $table->increments('id');
            $table->string('description')->default('');
            $table->integer('dish_option_id')->unsigned()->default(0);

            $table->foreign('dish_option_id')->references('id')->on('dish_option')->onDelete('cascade');
        });

        Schema::create('order', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->default(0);

            $table->foreign('user_id')->references('id')->on('user')->onDelete('cascade');
        });

        Schema::create('order_item', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('order_id')->unsigned()->default(0);
            $table->integer('dish_id')->unsigned()->default(0);

            $table->foreign('order_id')->references('id')->on('order')->onDelete('cascade');
            $table->foreign('dish_id')->references('id')->on('dish')->onDelete('cascade');
        });

        Schema::create('order_item_option', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('option_value')->unsigned()->default(0);
            $table->integer('order_item_id')->unsigned()->default(0);

            $table->foreign('order_item_id')->references('id')->on('order_item')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('order_item_option');
        Schema::drop('order_item');
        Schema::drop('order');
        Schema::drop('dish_option_value');
        Schema::drop('dish_option');
        Schema::drop('dish');
        Schema::drop('dish_category');
        Schema::drop('menu');
        Schema::drop('user');
    }
}
