# update(string $query, array $params = [])
This method is used to update a record in the database.

```php
$Database->update("UPDATE `table` SET `column` = ? WHERE `primary` = ?", ['value', 'id']);
```
