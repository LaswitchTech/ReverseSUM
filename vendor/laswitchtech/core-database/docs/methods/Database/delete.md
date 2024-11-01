# delete(string $query, array $params = [])
This method is used to delete data from the database.

```php
$Database->delete("DELETE FROM `table` WHERE `primary` = ?", ['id']);
```
