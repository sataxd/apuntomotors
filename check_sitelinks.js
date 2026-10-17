const sitelinks = [
    {
        title: "Diagnóstico con Escáner", // 23
        desc1: "Detección exacta de fallas hoy.", // 31
        desc2: "Escáner multimarca avanzado.", // 28
        url: "https://apuntomotors.com/servicios/diagnostico-computarizado"
    },
    {
        title: "Frenos y Suspensión", // 19
        desc1: "Cambio de pastillas y discos.", // 29
        desc2: "Revisión integral y amortiguador.", // 33
        url: "https://apuntomotors.com/servicios/suspension-direccion-frenos-y-embragues"
    },
    {
        title: "Mantenimiento General", // 21
        desc1: "Cambio de aceite y filtros.", // 27
        desc2: "Chequeo preventivo de motor.", // 28
        url: "https://apuntomotors.com/servicios/mantenimiento-preventivo-y-correctivo"
    },
    {
        title: "Inyectores Ultrasonido", // 22
        desc1: "Limpieza en banco de prueba.", // 28
        desc2: "Recupera potencia y ahorra gas.", // 31
        url: "https://apuntomotors.com/servicios/limpieza-de-inyectores-ultrasonido"
    },
    {
        title: "Aire Acondicionado", // 18
        desc1: "Recarga de gas y mantenimiento.", // 31
        desc2: "Elimina olores y viaja fresco.", // 30
        url: "https://apuntomotors.com/servicios/aire-acondicionado"
    },
    {
        title: "Contacto y Citas", // 16
        desc1: "Taller mecánico en La Molina.", // 29
        desc2: "Escríbenos y agenda por WhatsApp.", // 33
        url: "https://apuntomotors.com/contacto"
    }
];

sitelinks.forEach((s, i) => {
    console.log(`=== ENLACE ${i+1}: ${s.title} ===`);
    console.log(`Texto [${s.title.length}/25]: ${s.title} -> ${s.title.length <= 25 ? 'OK' : 'FAIL'}`);
    console.log(`Desc 1 [${s.desc1.length}/35]: ${s.desc1} -> ${s.desc1.length <= 35 ? 'OK' : 'FAIL'}`);
    console.log(`Desc 2 [${s.desc2.length}/35]: ${s.desc2} -> ${s.desc2.length <= 35 ? 'OK' : 'FAIL'}`);
    console.log(`URL: ${s.url}`);
});
