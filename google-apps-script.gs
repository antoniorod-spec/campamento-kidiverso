// =============================================
// GOOGLE APPS SCRIPT - Campamento Kidiverso 2026
// =============================================
//
// INSTRUCCIONES:
// 1. Crea un Google Sheet llamado "Inscripciones Campamento Kidiverso 2026"
// 2. Ve a Extensiones > Apps Script, borra todo y pega este archivo
// 3. Guarda (Ctrl+S)
// 4. Implementar > Administrar implementaciones > edita la existente > Nueva versión
// 5. Autoriza los permisos si te los pide
//
// CAMBIA EMAIL_KIDIVERSO por el correo donde quieres recibir los avisos internos.

var EMAIL_KIDIVERSO = 'hola@kidiverso.mx'; // <-- CAMBIA ESTO

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data  = JSON.parse(e.postData.contents);

    // ── Guardar en Sheet ──────────────────────────────────────────────
    sheet.appendRow([
      data.timestamp             || new Date().toLocaleString('es-MX'),
      data.nombre_nino           || '',
      data.edad                  || '',
      data.genero                || '',
      data.nombre_tutor          || '',
      data.parentesco            || '',
      data.telefono              || '',
      data.telefono_alterno      || '',
      data.email                 || '',
      data.emergencia_nombre     || '',
      data.emergencia_parentesco || '',
      data.emergencia_telefono   || '',
      data.autorizado_1          || '',
      data.autorizado_2          || '',
      data.alergias              || '',
      data.condiciones_medicas   || '',
      data.semana                || '',
      data.horario               || '',
      data.aut_imagen            || '',
      data.aut_emergencia        || '',
      data.aut_reglamento        || '',
      data.aut_datos             || '',
      data.observaciones         || ''
    ]);

    // ── Correo HTML al papá/mamá ──────────────────────────────────────
    if (data.email) {
      var horarioTexto = data.horario === 'extendido'
        ? '9:00 – 14:30 hrs <span style="color:#888;font-size:13px;">(horario extendido)</span>'
        : '9:00 – 13:30 hrs <span style="color:#888;font-size:13px;">(horario regular)</span>';

      var htmlCliente =
        '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#f0ebff;font-family:Arial,sans-serif;">' +

        // Wrapper
        '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ebff;padding:32px 16px;">' +
        '<tr><td align="center">' +
        '<table width="100%" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(52,28,119,0.12);">' +

        // Header morado
        '<tr><td style="background:linear-gradient(135deg,#341c77 0%,#7c3aed 100%);padding:36px 32px;text-align:center;">' +
        '<img src="https://camping.kidiverso.mx/logo-kidiverso-sin-fondo.png" alt="Kidiverso" style="width:180px;max-width:80%;height:auto;margin-bottom:12px;display:block;margin-left:auto;margin-right:auto;" />' +
        '<h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:800;line-height:1.2;">¡Pre-inscripción recibida!</h1>' +
        '<p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:15px;">Campamento de Pascua Kidiverso 2026</p>' +
        '</td></tr>' +

        // Saludo
        '<tr><td style="padding:32px 32px 8px;">' +
        '<p style="margin:0;font-size:16px;color:#1e1135;">Hola <strong>' + (data.nombre_tutor || 'papá/mamá') + '</strong>, 👋</p>' +
        '<p style="margin:12px 0 0;font-size:15px;color:#5a5270;line-height:1.6;">Recibimos la pre-inscripción de <strong style="color:#341c77;">' + (data.nombre_nino || 'tu hijo/a') + '</strong> al Campamento de Pascua. ¡Estamos emocionados de recibirlo(a)! 🎉</p>' +
        '</td></tr>' +

        // Tarjeta resumen
        '<tr><td style="padding:20px 32px;">' +
        '<table width="100%" style="background:#f7f5ff;border-radius:14px;border:2px solid #e8e4f4;overflow:hidden;">' +
        '<tr><td style="background:#341c77;padding:12px 20px;">' +
        '<p style="margin:0;color:#ffffff;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Resumen de inscripción</p>' +
        '</td></tr>' +
        '<tr><td style="padding:20px;">' +
        '<table width="100%" cellspacing="0">' +
        fila('👦', 'Niño(a)', data.nombre_nino || '') +
        fila('🎂', 'Edad', (data.edad || '') + ' años') +
        fila('📅', 'Fechas', '6 al 10 de abril de 2026') +
        fila('🗓️', 'Días inscritos', data.semana || '') +
        fila('🕘', 'Horario', horarioTexto) +
        '</table>' +
        '</td></tr>' +
        '</table>' +
        '</td></tr>' +

        // Qué sigue
        '<tr><td style="padding:8px 32px 24px;">' +
        '<p style="margin:0 0 12px;font-size:15px;font-weight:700;color:#341c77;">¿Qué sigue? 👇</p>' +
        '<table width="100%" cellspacing="0">' +
        paso('1', 'Te contactamos por WhatsApp al <strong>' + (data.telefono || '') + '</strong> para confirmar tu lugar.') +
        paso('2', 'Agendamos la firma presencial en Kidiverso.') +
        paso('3', 'Para reservar el lugar se requiere un anticipo mínimo de <strong>$250</strong>. Aceptamos transferencia, efectivo o tarjeta en el parque.') +
        '</table>' +
        '</td></tr>' +

        // Dudas
        '<tr><td style="padding:0 32px 32px;">' +
        '<table width="100%" style="background:#fff3d4;border-radius:12px;border:2px solid #FFBC7D;">' +
        '<tr><td style="padding:16px 20px;">' +
        '<p style="margin:0;font-size:14px;color:#5a5270;">¿Tienes dudas? Escríbenos:</p>' +
        '<p style="margin:8px 0 0;font-size:15px;color:#1e1135;">📱 <strong>WhatsApp: 440 186 4030</strong></p>' +
        '<p style="margin:4px 0 0;font-size:15px;color:#1e1135;">🌐 <strong>kidiverso.mx</strong></p>' +
        '</td></tr>' +
        '</table>' +
        '</td></tr>' +

        // Footer
        '<tr><td style="background:#341c77;padding:20px 32px;text-align:center;">' +
        '<p style="margin:0;color:rgba(255,255,255,0.9);font-size:14px;">¡Nos vemos en el campamento! 🧡</p>' +
        '<p style="margin:6px 0 0;color:rgba(255,255,255,0.5);font-size:12px;">Kidiverso · San Luis Potosí, México</p>' +
        '</td></tr>' +

        '</table>' +
        '</td></tr></table>' +
        '</body></html>';

      MailApp.sendEmail({
        to:       data.email,
        subject:  '🎪 ¡Pre-inscripción recibida! Campamento de Pascua Kidiverso 2026',
        htmlBody: htmlCliente
      });
    }

    // ── Aviso interno a Kidiverso (texto plano) ───────────────────────
    var cuerpoInterno =
      'Nueva pre-inscripción recibida:\n\n' +
      'Niño(a):    ' + (data.nombre_nino  || '') + '  (' + (data.edad || '') + ' años)\n' +
      'Tutor:      ' + (data.nombre_tutor || '') + ' — ' + (data.parentesco || '') + '\n' +
      'Teléfono:   ' + (data.telefono     || '') + '\n' +
      'Email:      ' + (data.email        || '') + '\n' +
      'Días:       ' + (data.semana       || '') + '\n' +
      'Horario:    ' + (data.horario      || '') + '\n' +
      'Alergias:   ' + (data.alergias     || 'Ninguna') + '\n' +
      'Médico:     ' + (data.condiciones_medicas || 'Ninguno') + '\n' +
      'Observaciones: ' + (data.observaciones   || '—') + '\n\n' +
      'Ver todas las inscripciones en Google Sheets.';

    MailApp.sendEmail({
      to:      EMAIL_KIDIVERSO,
      subject: '🎒 Nueva pre-inscripción: ' + (data.nombre_nino || 'sin nombre'),
      body:    cuerpoInterno
    });

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Helpers para filas y pasos del email HTML
function fila(emoji, label, valor) {
  return '<tr>' +
    '<td style="padding:6px 0;width:28px;vertical-align:top;font-size:16px;">' + emoji + '</td>' +
    '<td style="padding:6px 8px 6px 0;color:#5a5270;font-size:14px;vertical-align:top;white-space:nowrap;">' + label + '</td>' +
    '<td style="padding:6px 0;color:#1e1135;font-size:14px;font-weight:700;vertical-align:top;">' + valor + '</td>' +
    '</tr>';
}

function paso(num, texto) {
  return '<tr><td style="padding:6px 0;vertical-align:top;">' +
    '<table cellspacing="0"><tr>' +
    '<td style="vertical-align:top;padding-right:10px;">' +
    '<span style="display:inline-block;width:24px;height:24px;background:#341c77;color:#fff;border-radius:50%;text-align:center;line-height:24px;font-size:13px;font-weight:700;">' + num + '</span>' +
    '</td>' +
    '<td style="vertical-align:middle;font-size:14px;color:#5a5270;line-height:1.5;">' + texto + '</td>' +
    '</tr></table>' +
    '</td></tr>';
}

// Verifica que el deploy esté activo
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Campamento Kidiverso API activa' }))
    .setMimeType(ContentService.MimeType.JSON);
}
