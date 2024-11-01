# update(string $query = "", array $params = [])
This method is used to update data in the database.

```php
$this->update("UPDATE `example` SET `email` = ? WHERE `id` = ?", ["username@domain.com",1]);
```
