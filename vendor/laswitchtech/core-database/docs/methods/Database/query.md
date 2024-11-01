# query(string $query, array $params = [])
This method is used to execute a query on the database. This method is used for all database operations.

```php
$Database->query("DELETE FROM `table` WHERE `primary` = ?", ['id']);
$Database->query("UPDATE `table` SET `column` = ? WHERE `primary` = ?", ['value', 'id']);
$Database->query("SELECT * FROM `table` WHERE `primary` = ?", ['id']);
$Database->query("INSERT INTO `table` (`column`) VALUES (?)", ['value']);
```
