# alter([string $table, array $columns])
This method is used to alter a table by adding columns to it or modifying existing columns.

```php
$this->alter('example', [
    "id" => [
        'action' => 'ADD',
        'type' => 'bigint(10) unsigned',
    ],
]);
```
