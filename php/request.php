$files = scandir("~/Document/Website/6te/arithmetic/");
$imgs = [];

foreach ($files as $key => $value) {
    if (stripos($value, '.png')) {
        $imgs[] = $value;
    }
}

echo json_encode($imgs);

