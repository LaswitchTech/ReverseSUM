# Usage
## Initiate Logger
To use `coreLogger`, simply include the coreLogger.php file and create a new instance of the `Logger` class.

```php

// Import Logger class into the global namespace
// These must be at the top of your script, not inside a function
use LaswitchTech\coreLogger\Logger;

// Load Composer's autoloader
require 'vendor/autoload.php';

// Initiate coreLogger
$Logger = new Logger();
```

## Methods
`coreLogger` provides the following methods:

- [add()](methods/Logger/add.md)
- [clear()](methods/Logger/clear.md)
- [config()](methods/Logger/config.md)
- [debug()](methods/Logger/debug.md)
- [error()](methods/Logger/error.md)
- [get()](methods/Logger/get.md)
- [info()](methods/Logger/info.md)
- [ip()](methods/Logger/ip.md)
- [isInstalled()](methods/Logger/isInstalled.md)
- [list()](methods/Logger/list.md)
- [log()](methods/Logger/log.md)
- [read()](methods/Logger/read.md)
- [set()](methods/Logger/set.md)
- [success()](methods/Logger/success.md)
- [warning()](methods/Logger/warning.md)

## Initiate Command for coreCLI integration
To use `Command`, simply create `Command/LoggerCommand.php` file and extend a new instance of the `Command` class.

```php

// Import Logger class into the global namespace
// These must be at the top of your script, not inside a function
use LaswitchTech\coreLogger\Command;

// Initiate the Command class
class LoggerCommand extends Command {}
```

### Methods
`Command` provides the following methods:

- [clearAction()](methods/Command/clearAction.md)
- [listAction()](methods/Command/listAction.md)
- [readAction()](methods/Command/readAction.md)

## Initiate Controller for coreAPI and/or coreRouter integration
To use `Controller`, simply create `Controller/LoggerController.php` file and extend a new instance of the `Controller` class.

```php

// Import Logger class into the global namespace
// These must be at the top of your script, not inside a function
use LaswitchTech\coreLogger\Controller;

// Initiate the Controller class
class LoggerController extends Controller {}
```

### Methods
`Controller` provides the following methods:

- [clearAction()](methods/Controller/clearAction.md)
- [clearRouterAction()](methods/Controller/clearRouterAction.md)
- [listAction()](methods/Controller/listAction.md)
- [listRouterAction()](methods/Controller/listRouterAction.md)
- [readAction()](methods/Controller/readAction.md)
- [readRouterAction()](methods/Controller/readRouterAction.md)

## Adding the Logger's list View
To use the included view file, simply add a route pointing to the view file (`vendor/laswitchtech/core-logger/View/list.php`).

## Adding the Logger's reader View
To use the included view file, simply add a route pointing to the view file (`vendor/laswitchtech/core-logger/View/reader.php`).
