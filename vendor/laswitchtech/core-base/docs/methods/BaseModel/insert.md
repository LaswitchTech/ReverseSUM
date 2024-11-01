# insert(string $query = "", array $params = [])
This method is used to insert data into the database.

```php
$this->insert("INSERT INTO `example` (`owner`, `email`) VALUES (?, ?)", ["email@domain.com","email@domain.com"]);
```
