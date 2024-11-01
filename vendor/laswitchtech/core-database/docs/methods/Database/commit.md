# commit()
This method is used to commit a transaction. It is used to ensure that all the queries in the transaction are executed successfully before committing the transaction. If any of the queries in the transaction fails, the transaction is rolled back and the database is restored to its previous state.

```php
$Database->commit();
```
