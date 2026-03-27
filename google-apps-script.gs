// =============================================
// GOOGLE APPS SCRIPT - Campamento Kidiverso 2026
// =============================================
//
// INSTRUCCIONES:
// 1. Crea un Google Sheet llamado "Inscripciones Campamento Kidiverso 2026"
// 2. Ve a Extensiones > Apps Script, borra todo y pega este archivo
// 3. Guarda (Ctrl+S)
// 4. Implementar > Nueva implementación > App web
//    - Ejecutar como: Yo (tu cuenta)
//    - Quién tiene acceso: Cualquier persona
// 5. Autoriza los permisos
// 6. Copia la URL /exec y pégala en el HTML
//
// CORREO DE KIDIVERSO: cambia EMAIL_KIDIVERSO por el correo real donde
// quieres recibir avisos de cada nueva inscripción.

var EMAIL_KIDIVERSO = 'hola@kidiverso.mx'; // <-- CAMBIA ESTO

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data  = JSON.parse(e.postData.contents);

    // ── Guardar en Sheet ──────────────────────────────────────────────
    sheet.appendRow([
      data.timestamp          || new Date().toLocaleString('es-MX'),
      data.nombre_nino        || '',
      data.edad               || '',
      data.genero             || '',
      data.nombre_tutor       || '',
      data.parentesco         || '',
      data.telefono           || '',
      data.telefono_alterno   || '',
      data.email              || '',
      data.emergencia_nombre  || '',
      data.emergencia_parentesco || '',
      data.emergencia_telefono   || '',
      data.autorizado_1       || '',
      data.autorizado_2       || '',
      data.alergias           || '',
      data.condiciones_medicas|| '',
      data.semana             || '',
      data.horario            || '',
      data.aut_imagen         || '',
      data.aut_emergencia     || '',
      data.aut_reglamento     || '',
      data.aut_datos          || ''
    ]);

    // ── Correo de confirmación al papá/mamá ──────────────────────────
    if (data.email) {
      var horarioTexto = data.horario === 'extendido'
        ? '9:00 a 14:30 hrs (horario extendido)'
        : '9:00 a 13:30 hrs (horario regular)';

      var asuntoCliente = '¡Pre-inscripción recibida! Campamento de Pascua Kidiverso 2026';

      var cuerpoCliente =
        'Hola ' + (data.nombre_tutor || 'papá/mamá') + ',\n\n' +
        '¡Recibimos la pre-inscripción de ' + (data.nombre_nino || 'tu hijo/a') + ' al Campamento de Pascua Kidiverso 2026! 🎉\n\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
        'RESUMEN DE INSCRIPCIÓN\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
        '👦 Niño(a):   ' + (data.nombre_nino || '') + '\n' +
        '🗓️  Fechas:    6 al 10 de abril de 2026\n' +
        '📅 Días:      ' + (data.semana || '') + '\n' +
        '🕘 Horario:   ' + horarioTexto + '\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
        '¿QUÉ SIGUE?\n\n' +
        'Nos pondremos en contacto contigo por WhatsApp al número ' + (data.telefono || '') + ' para:\n' +
        '  1. Confirmar disponibilidad de lugar\n' +
        '  2. Agendar la firma presencial en Kidiverso\n' +
        '  3. Indicarte los detalles del pago\n\n' +
        'Recuerda que para reservar el lugar se requiere un anticipo mínimo de $250.\n\n' +
        '¿Tienes dudas? Escríbenos directamente:\n' +
        '📱 WhatsApp: 440 186 4030\n' +
        '🌐 kidiverso.mx\n\n' +
        '¡Nos vemos en el campamento!\n' +
        'El equipo de Kidiverso 🧡';

      MailApp.sendEmail(data.email, asuntoCliente, cuerpoCliente);
    }

    // ── Aviso interno a Kidiverso ────────────────────────────────────
    var asuntoInterno = '🎒 Nueva pre-inscripción: ' + (data.nombre_nino || 'sin nombre');
    var cuerpoInterno =
      'Nueva pre-inscripción recibida:\n\n' +
      'Niño(a):   ' + (data.nombre_nino  || '') + '  (' + (data.edad || '') + ' años)\n' +
      'Tutor:     ' + (data.nombre_tutor || '') + ' — ' + (data.parentesco || '') + '\n' +
      'Teléfono:  ' + (data.telefono     || '') + '\n' +
      'Email:     ' + (data.email        || '') + '\n' +
      'Días:      ' + (data.semana       || '') + '\n' +
      'Horario:   ' + (data.horario      || '') + '\n' +
      'Alergias:  ' + (data.alergias     || 'Ninguna') + '\n\n' +
      'Ver hoja completa en Google Sheets.';

    MailApp.sendEmail(EMAIL_KIDIVERSO, asuntoInterno, cuerpoInterno);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Responde al GET para verificar que el deploy está activo
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Campamento Kidiverso API activa' }))
    .setMimeType(ContentService.MimeType.JSON);
}
