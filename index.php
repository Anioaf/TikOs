<?php
$videoDir = __DIR__ . '/content';
$videos = [];

foreach (scandir($videoDir) as $file) {
    if (pathinfo($file, PATHINFO_EXTENSION) === 'mp4') {
        $videos[] = 'content/' . $file;
    }
}

$videosJson = json_encode(array_values($videos));
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Web Scroller</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="scroller"></div>

<script>
    const videos = <?php echo $videosJson; ?>;
</script>
<script src="script.js"></script>
</body>
</html>
