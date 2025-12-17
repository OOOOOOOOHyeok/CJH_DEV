<?php
// page02/index.php
?>
<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <title>Page 02</title>
  <style>
    body {
      font-family: system-ui, -apple-system, "Segoe UI", Arial, sans-serif;
      padding: 40px;
      background: #f5f5f5;
    }
    .box {
      background: #fff;
      padding: 24px;
      border-radius: 8px;
      max-width: 600px;
      margin: 0 auto;
    }
  </style>
</head>
<body>
  <div class="box">
    <h1>Page 02</h1>
    <p>이건 두 번째 PHP 페이지입니다.</p>
    <p>현재 시간: <b><?= date("Y-m-d H:i:s") ?></b></p>

    <a href="../page01/index.php">← Page 01로 이동</a>
  </div>
</body>
</html>
