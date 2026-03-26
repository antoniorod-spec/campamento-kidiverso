// =============================================
// GOOGLE APPS SCRIPT - Campamento Kidiverso 2026
// =============================================
// 
// INSTRUCCIONES:
// 1. Crea un Google Sheet nuevo llamado "Inscripciones Campamento Kidiverso 2026"
// 2. En la FILA 1 pon estos encabezados exactos (uno por celda, de A a Z):
//
//    A: Timestamp
//    B: Nombre del Niño
//    C: Fecha de Nacimiento
//    D: Edad
//    E: Escuela
//    F: Talla
//    G: Género
//    H: Nombre Tutor
//    I: Parentesco
//    J: Teléfono
//    K: Teléfono Alterno
//    L: Email
//    M: Emergencia - Nombre
//    N: Emergencia - Parentesco
//    O: Emergencia - Teléfono
//    P: Autorizado 1
//    Q: Autorizado 2
//    R: Alergias
//    S: Tipo de Sangre
//    T: Condiciones Médicas
//    U: Semana
//    V: Horario
//    W: Aut. Imagen
//    X: Aut. Emergencia
//    Y: Aut. Reglamento
//    Z: Aut. Datos
//
// 3. Ve a Extensiones > Apps Script
// 4. Borra todo el contenido y pega este archivo completo
// 5. Guarda (Ctrl+S)
// 6. Haz deploy:
//    - Implementar > Nueva implementación
//    - Tipo: App web
//    - Ejecutar como: Tu cuenta (yo)
//    - Quién tiene acceso: Cualquier persona
// 7. Autoriza los permisos cuando te lo pida
// 8. Copia la URL del deploy
// 9. Pégala en el HTML donde dice PEGA_AQUI_TU_URL_DE_APPS_SCRIPT
//
// ¡Listo! Cada inscripción aparecerá como una nueva fila en tu Sheet.

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Append row with all fields in order
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString('es-MX'),
      data.nombre_nino || '',
      data.fecha_nacimiento || '',
      data.edad || '',
      data.escuela || '',
      data.talla || '',
      data.genero || '',
      data.nombre_tutor || '',
      data.parentesco || '',
      data.telefono || '',
      data.telefono_alterno || '',
      data.email || '',
      data.emergencia_nombre || '',
      data.emergencia_parentesco || '',
      data.emergencia_telefono || '',
      data.autorizado_1 || '',
      data.autorizado_2 || '',
      data.alergias || '',
      data.tipo_sangre || '',
      data.condiciones_medicas || '',
      data.semana || '',
      data.horario || '',
      data.aut_imagen || '',
      data.aut_emergencia || '',
      data.aut_reglamento || '',
      data.aut_datos || ''
    ]);
    
    // Optional: Send email notification to Kidiverso
    // Descomenta las siguientes líneas si quieres recibir un correo por cada inscripción:
    //
    // var subject = '🚀 Nueva Inscripción Campamento - ' + data.nombre_nino;
    // var body = 'Nueva inscripción recibida:\n\n'
    //   + 'Niño(a): ' + data.nombre_nino + '\n'
    //   + 'Edad: ' + data.edad + ' años\n'
    //   + 'Tutor: ' + data.nombre_tutor + '\n'
    //   + 'Teléfono: ' + data.telefono + '\n'
    //   + 'Email: ' + data.email + '\n'
    //   + 'Semana: ' + data.semana + '\n'
    //   + 'Horario: ' + data.horario + '\n\n'
    //   + 'Ver todas las inscripciones en el Google Sheet.';
    // MailApp.sendEmail('hola@kidiverso.mx', subject, body);
    
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Required for CORS preflight requests
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Campamento Kidiverso API activa' }))
    .setMimeType(ContentService.MimeType.JSON);
}
