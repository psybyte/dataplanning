<?php
/**
 * Dataplanning — Formulario de contacto
 * Envia un email a la direccion de la agencia usando la funcion mail() nativa de PHP
 * (disponible en el hosting Arsys, sin dependencias externas).
 *
 * Devuelve siempre JSON: {"ok": true} o {"ok": false, "error": "..."}
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

// --- Configuracion ---
const DESTINATION_EMAIL = 'hola@dataplanning.es';
const MAX_FILE_SIZE      = 5 * 1024 * 1024; // 5 MB
const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx'];

function respond(bool $ok, string $error = ''): void
{
    echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $error]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Metodo no permitido');
}

// --- Honeypot anti-spam: si el campo oculto "website" viene relleno, es un bot ---
if (!empty($_POST['website'])) {
    respond(true); // respondemos ok para no dar pistas a los bots
}

// --- Recogida y validacion de campos ---
$nombre  = trim((string)($_POST['nombre'] ?? ''));
$email   = trim((string)($_POST['email'] ?? ''));
$mensaje = trim((string)($_POST['mensaje'] ?? ''));

if ($nombre === '' || $email === '' || $mensaje === '') {
    respond(false, 'Faltan campos obligatorios');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'El email no es valido');
}

// evita inyeccion de cabeceras si algun campo contiene saltos de linea
$sanitize = static fn (string $v): string => str_replace(["\r", "\n"], ' ', $v);
$nombre  = $sanitize($nombre);
$email   = $sanitize($email);

// --- Adjunto opcional (CV) ---
$attachment = null;
if (!empty($_FILES['cv']) && $_FILES['cv']['error'] !== UPLOAD_ERR_NO_FILE) {
    $file = $_FILES['cv'];

    if ($file['error'] !== UPLOAD_ERR_OK) {
        respond(false, 'Error al subir el archivo');
    }
    if ($file['size'] > MAX_FILE_SIZE) {
        respond(false, 'El archivo supera el tamaño maximo permitido (5MB)');
    }

    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, ALLOWED_EXTENSIONS, true)) {
        respond(false, 'Formato de archivo no permitido (solo PDF, DOC, DOCX)');
    }

    $content = file_get_contents($file['tmp_name']);
    if ($content === false) {
        respond(false, 'No se ha podido leer el archivo adjunto');
    }

    $attachment = [
        'name'    => preg_replace('/[^A-Za-z0-9._-]/', '_', $file['name']),
        'content' => $content,
    ];
}

// --- Construccion del email ---
$subject = 'Nuevo mensaje de contacto — dataplanning.es';
$boundary = 'dp-' . bin2hex(random_bytes(12));

$body  = "Nombre: {$nombre}\r\n";
$body .= "Email: {$email}\r\n\r\n";
$body .= "Mensaje:\r\n{$mensaje}\r\n";

$headers   = [];
$headers[] = 'From: Dataplanning Web <no-reply@dataplanning.es>';
$headers[] = "Reply-To: {$nombre} <{$email}>";
$headers[] = 'MIME-Version: 1.0';

if ($attachment) {
    $headers[] = "Content-Type: multipart/mixed; boundary=\"{$boundary}\"";

    $message  = "--{$boundary}\r\n";
    $message .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $message .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $message .= $body . "\r\n";

    $message .= "--{$boundary}\r\n";
    $message .= "Content-Type: application/octet-stream; name=\"{$attachment['name']}\"\r\n";
    $message .= "Content-Transfer-Encoding: base64\r\n";
    $message .= "Content-Disposition: attachment; filename=\"{$attachment['name']}\"\r\n\r\n";
    $message .= chunk_split(base64_encode($attachment['content']));
    $message .= "--{$boundary}--";
} else {
    $headers[] = 'Content-Type: text/plain; charset=UTF-8';
    $message = $body;
}

$sent = mail(DESTINATION_EMAIL, '=?UTF-8?B?' . base64_encode($subject) . '?=', $message, implode("\r\n", $headers));

if (!$sent) {
    respond(false, 'No se ha podido enviar el email. Intentalo de nuevo mas tarde.');
}

respond(true);
