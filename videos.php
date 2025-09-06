<?php
header('Content-Type: application/json');

$videoDir = __DIR__ . '/content';
$videos = [];

foreach (scandir($videoDir) as $file) {
    if (pathinfo($file, PATHINFO_EXTENSION) === 'mp4') {
        $videos[] = 'content/' . $file;
    }
}

echo json_encode(array_values($videos));
