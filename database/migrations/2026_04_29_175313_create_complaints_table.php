<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('complaints', function (Blueprint $table) {
        $table->uuid('id')->default(DB::raw('(UUID())'))->primary();
        $table->string('correlative')->unique(); // Ej: 2026-000001
        
        // 1. Identificación del Consumidor
        $table->string('fullname');
        $table->string('document_type'); // DNI, CE, Pasaporte
        $table->string('document_number');
        $table->string('phone');
        $table->string('email');
        
        // 2. Ubicación
        $table->string('department');
        $table->string('province');
        $table->string('district');
        $table->string('address');
        
        // 3. Identificación del bien contratado
        $table->string('contract_type'); // Producto o Servicio
        $table->decimal('claimed_amount', 10, 2)->default(0);
        $table->longText('product_description')->nullable();
        
        // 4. Detalle del reclamo
        $table->string('type'); // Reclamo o Queja
        $table->date('incident_date');
        $table->string('order_number')->nullable();
        $table->text('details');
        
        // 5. Estado de gestión (Para tu panel admin)
        $table->boolean('status')->default(true); // true = Pendiente, false = Atendido
        
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('complaints');
    }
};
