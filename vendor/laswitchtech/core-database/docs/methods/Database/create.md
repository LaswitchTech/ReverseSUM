# create(string $table, array $columns, array $unique_keys = []);
This method is used to create a table.

```php
$Database->create('table',['id' => 'BIGINT(10)', 'column' => 'VARCHAR(255)'], ['column']);
```
