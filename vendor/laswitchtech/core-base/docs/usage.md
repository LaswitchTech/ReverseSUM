# Usage
## Initiate BaseCommand
To use `BaseCommand`, simply include the BaseCommand.php file and create a new instance of the `BaseCommand` class.

```php
<?php

// Import additionnal class into the global namespace
use LaswitchTech\coreBase\BaseCommand;

class [Your Command]Command extends BaseCommand {}
```

### Properties
`BaseCommand` provides the following properties:

- [Configurator](https://github.com/LaswitchTech/coreConfigurator)
- [Logger](https://github.com/LaswitchTech/coreLogger)
- [Auth](https://github.com/LaswitchTech/coreAuth)

### Methods
`BaseCommand` provides the following methods:

- [error()](methods/BaseCommand/error.md)
- [info()](methods/BaseCommand/info.md)
- [input()](methods/BaseCommand/input.md)
- [output()](methods/BaseCommand/output.md)
- [set()](methods/BaseCommand/set.md)
- [success()](methods/BaseCommand/success.md)
- [warning()](methods/BaseCommand/warning.md)

## Initiate BaseController
To use `BaseController`, simply include the BaseController.php file and create a new instance of the `BaseController` class.

```php
<?php

// Import additionnal class into the global namespace
use LaswitchTech\coreBase\BaseController;

class [Your Controller]Controller extends BaseController {}
```

### Properties
`BaseController` provides the following properties:

- [Configurator](https://github.com/LaswitchTech/coreConfigurator)
- [Logger](https://github.com/LaswitchTech/coreLogger)
- [Auth](https://github.com/LaswitchTech/coreAuth)
- [CSRF](https://github.com/LaswitchTech/coreCSRF)

### Methods
`BaseController` provides the following methods:

- [getGetParams()](methods/BaseController/getGetParams.md)
- [getParams()](methods/BaseController/getParams.md)
- [getPostParams()](methods/BaseController/getPostParams.md)
- [getQueryStringParams()](methods/BaseController/getQueryStringParams.md)
- [getRequestParams()](methods/BaseController/getRequestParams.md)
- [getUriSegments()](methods/BaseController/getUriSegments.md)
- [output()](methods/BaseController/output.md)

## Initiate BaseModel
To use `BaseModel`, simply include the BaseModel.php file and create a new instance of the `BaseModel` class.

```php
<?php

// Import additionnal class into the global namespace
use LaswitchTech\coreBase\BaseModel;

class [Your Model]Model extends BaseModel {}
```

### Methods
`BaseModel` provides the following methods:

- [alter()](methods/BaseModel/alter.md)
- [backup()](methods/BaseModel/backup.md)
- [begin()](methods/BaseModel/begin.md)
- [commit()](methods/BaseModel/commit.md)
- [config()](methods/BaseModel/config.md)
- [connect()](methods/BaseModel/connect.md)
- [create()](methods/BaseModel/create.md)
- [delete()](methods/BaseModel/delete.md)
- [drop()](methods/BaseModel/drop.md)
- [getColumns()](methods/BaseModel/getColumns.md)
- [getDefaults()](methods/BaseModel/getDefaults.md)
- [getNullables()](methods/BaseModel/getNullables.md)
- [getOnUpdate()](methods/BaseModel/getOnUpdate.md)
- [getPrimary()](methods/BaseModel/getPrimary.md)
- [getRequired()](methods/BaseModel/getRequired.md)
- [getTable()](methods/BaseModel/getTable.md)
- [insert()](methods/BaseModel/insert.md)
- [isConnected()](methods/BaseModel/isConnected.md)
- [query()](methods/BaseModel/query.md)
- [restore()](methods/BaseModel/restore.md)
- [rollback()](methods/BaseModel/rollback.md)
- [schema()](methods/BaseModel/schema.md)
- [select()](methods/BaseModel/select.md)
- [truncate()](methods/BaseModel/truncate.md)
- [update()](methods/BaseModel/update.md)
- [upgrade()](methods/BaseModel/upgrade.md)
