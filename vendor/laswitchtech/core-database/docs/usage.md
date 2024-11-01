# Usage
## Initiate Database
To use `Database`, simply include the Database.php file and create a new instance of the `Database` class.

```php
<?php

// Import additionnal class into the global namespace
use LaswitchTech\coreDatabase\Database;

// Load Composer's autoloader
require 'vendor/autoload.php';

// Initiate Database
$Database = new Database();
```

### Properties
`Database` provides the following properties:

- [Configurator](https://github.com/LaswitchTech/coreConfigurator)
- [Logger](https://github.com/LaswitchTech/coreLogger)
- [Net](https://github.com/LaswitchTech/coreNet)

### Methods
`Database` provides the following methods:

#### General
- [config()](methods/Database/config.md)
- [isInstalled()](methods/Database/isInstalled.md)

#### Database Connection
- [connect()](methods/Database/connect.md)
- [isConnected()](methods/Database/isConnected.md)

#### Transactions
- [begin()](methods/Database/begin.md)
- [commit()](methods/Database/commit.md)
- [rollback()](methods/Database/rollback.md)

#### Row Query
- [query()](methods/Database/query.md)
- [insert()](methods/Database/insert.md)
- [select()](methods/Database/select.md)
- [update()](methods/Database/update.md)
- [delete()](methods/Database/delete.md)

#### Table Query
- [create()](methods/Database/create.md)
- [alter()](methods/Database/alter.md)
- [drop()](methods/Database/drop.md)
- [truncate()](methods/Database/truncate.md)

#### Table Structure
- [getTable()](methods/Database/getTable.md)
- [getColumns()](methods/Database/getColumns.md)
- [getRequired()](methods/Database/getRequired.md)
- [getDefaults()](methods/Database/getDefaults.md)
- [getOnUpdate()](methods/Database/getOnUpdate.md)
- [getPrimary()](methods/Database/getPrimary.md)
- [getNullables()](methods/Database/getNullables.md)

#### Backup & Restore
- [backup()](methods/Database/backup.md)
- [restore()](methods/Database/restore.md)
- [schema()](methods/Database/schema.md)
- [upgrade()](methods/Database/upgrade.md)
