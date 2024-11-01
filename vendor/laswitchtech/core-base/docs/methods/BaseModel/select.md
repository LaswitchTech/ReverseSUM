# select(string $query = "", array $params = [])
This method is used to select data from the database.

```php
$this->select("SELECT * FROM `example` WHERE `id` = ?", [1]);
```
