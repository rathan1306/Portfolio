<?php

declare(strict_types=1);

function sum(...$numbers ) : int {
    // This is a test function
    echo "The sum is: " . array_sum($numbers) . '<br \>';
    echo "Hello, World!";
    return array_sum($numbers);
}

sum(1, 2, 3, 4, 5);
?>