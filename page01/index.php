<?php
// index.php
?>
<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>PHP 한 페이지</title>
  <style>
    body { font-family: system-ui, -apple-system, "Segoe UI", Arial, sans-serif; padding: 40px; }
    .box { max-width: 720px; margin: 0 auto; line-height: 1.8; }
  </style>
</head>
<body>
  <div class="box">
    <h1>안녕하세요 👋</h1>
    <p>이건 PHP로 만든 단일 파일 웹페이지입니다.</p>
    <p>현재 시간: <b><?= date("Y-m-d H:i:s") ?></b></p>
  </div>
</body>
</html>
