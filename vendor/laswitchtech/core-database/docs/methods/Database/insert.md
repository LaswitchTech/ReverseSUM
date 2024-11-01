# insert(string $query, array $params = [])
This method is used to insert data into the database.

```php
$Database->insert("INSERT INTO `table` (`column`) VALUES (?)", ['value']);
```
