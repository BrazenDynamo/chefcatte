<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ImproveOrderOptionValuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('dish_option_value', function(Blueprint $table) {
            $table->integer('place_number')->unsigned()
                  ->after('description')->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('dish_option_value', function(Blueprint $table) {
            $table->dropColumn('place_number');
        });
    }
}
