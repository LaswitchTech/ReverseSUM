# delete(string $query = "", array $params = [])
This method is used to delete data from the database.

```php
$this->delete("DELETE FROM `example` WHERE id = ?", [1]);
```
