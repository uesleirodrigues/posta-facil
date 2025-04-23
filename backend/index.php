<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$requestUri = $_SERVER['REQUEST_URI'];

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($requestUri === '/api/gerar-post' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');

    $input = json_decode(file_get_contents('php://input'), true);

    // Coletando dados do payload
    $negocio = $input['negocio'] ?? 'Negócio Genérico';
    $tipo = $input['tipo'] ?? 'Tipo de Negócio';
    $estilo = $input['estilo'] ?? 'informativo';
    $tema = $input['tema'] ?? 'nenhum';
    $canal = $input['canal'] ?? 'Instagram';
    $quantidade = (int) ($input['quantidade'] ?? 1);

    // Simulando geração de posts
    $posts = [];
    for ($i = 0; $i < $quantidade; $i++) {
        $posts[] = "📢 [$tema] Dica $i para $negocio ($tipo), com estilo $estilo no $canal!";
    }

    echo json_encode([
        'posts' => $posts
    ]);

    exit;
}

http_response_code(404);
echo json_encode([
    'error' => 'Rota não encontrada'
]);
