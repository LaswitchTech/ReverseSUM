# select(string $query, array $params = [])
This method is used to select data from the database.

```php
$Database->select("SELECT * FROM `table` WHERE `primary` = ?", ['id']);
```
