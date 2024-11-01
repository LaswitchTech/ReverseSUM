# create(string $table, array $columns, array $uniqueKeys = null)
This method is used to create a table in the database.

```php
$this->create('example', [
    'id' => 'INT(11) AUTO_INCREMENT PRIMARY KEY',
    'created' => 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    'modified' => 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    'owner' => 'VARCHAR(255) NOT NULL',
    'email' => 'VARCHAR(255) NOT NULL',
], [ 'id', 'email' ]);
```
