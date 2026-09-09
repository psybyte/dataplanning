<?php
/**
 * Sirve la landing con título, descripción y canonical propios
 * para cada sección del navbar (castellano, para sitelinks de Google).
 */

declare(strict_types=1);

const SITE = 'https://www.dataplanning.es';

const SECTIONS = [
    'somos' => [
        'title' => 'Somos · Dataplanning',
        'description' => 'Mucho más que una agencia de medios. Agencia independiente en Barcelona desde 2001. Soluciones integrales de comunicación. Pure Accuracy.',
    ],
    'talento' => [
        'title' => 'Talento · Dataplanning',
        'description' => 'Personas que marcan la diferencia. El equipo de Dataplanning, agencia de medios en Barcelona especializada en estrategia y planificación.',
    ],
    'aportamos' => [
        'title' => 'Aportamos · Dataplanning',
        'description' => 'La fuerza de la experiencia. Estrategia de medios crossmedia para conectar marcas con una audiencia fragmentada y multiplataforma.',
    ],
    'clientes' => [
        'title' => 'Clientes · Dataplanning',
        'description' => 'Marcas que crecen junto a nosotros. Más de 80 clientes confían en Dataplanning para evolucionar y descubrir nuevas oportunidades.',
    ],
    'contacto' => [
        'title' => 'Contacto · Dataplanning',
        'description' => 'Contacta con Dataplanning. Beethoven 15, 08021 Barcelona. Teléfono +34 93 241 19 98. hola@dataplanning.es.',
    ],
];

$path = (string) parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$slug = trim($path, '/');

if (!isset(SECTIONS[$slug])) {
    header('Location: /', true, 301);
    exit;
}

$seo = SECTIONS[$slug];
$canonical = SITE . '/' . $slug . '/';
$htmlPath = dirname(__DIR__) . '/index.html';

if (!is_readable($htmlPath)) {
    http_response_code(500);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'No se ha podido cargar la página.';
    exit;
}

$html = file_get_contents($htmlPath);

$html = preg_replace(
    '/<html\s+lang="es">/',
    '<html lang="es" data-section="' . htmlspecialchars($slug, ENT_QUOTES, 'UTF-8') . '">',
    $html,
    1
);

$html = preg_replace(
    '/(<title[^>]*>).*?(<\/title>)/s',
    '$1' . htmlspecialchars($seo['title'], ENT_NOQUOTES, 'UTF-8') . '$2',
    $html,
    1
);

$desc = htmlspecialchars($seo['description'], ENT_QUOTES, 'UTF-8');
$titleAttr = htmlspecialchars($seo['title'], ENT_QUOTES, 'UTF-8');
$canonAttr = htmlspecialchars($canonical, ENT_QUOTES, 'UTF-8');

$html = preg_replace(
    '/(<meta name="description" content=")[^"]*(")/',
    '$1' . $desc . '$2',
    $html,
    1
);
$html = preg_replace(
    '/(<meta property="og:title" content=")[^"]*(")/',
    '$1' . $titleAttr . '$2',
    $html,
    1
);
$html = preg_replace(
    '/(<meta property="og:description" content=")[^"]*(")/',
    '$1' . $desc . '$2',
    $html,
    1
);
$html = preg_replace(
    '/(<meta property="og:url" content=")[^"]*(")/',
    '$1' . $canonAttr . '$2',
    $html,
    1
);
$html = preg_replace(
    '/(<link rel="canonical" href=")[^"]*(")/',
    '$1' . $canonAttr . '$2',
    $html,
    1
);

header('Content-Type: text/html; charset=UTF-8');
echo $html;
