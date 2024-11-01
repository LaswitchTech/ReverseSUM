# Usage
## Initiate Net
To use `Net`, simply include the Net.php file and create a new instance of the `Net` class.

```php
<?php

// Import additionnal class into the global namespace
use LaswitchTech\coreNet\Net;

// Load Composer's autoloader
require 'vendor/autoload.php';

// Initiate Net
$Net = new Net();
```

### Properties
`Net` provides the following properties:

- [Configurator](https://github.com/LaswitchTech/coreConfigurator)
- [Logger](https://github.com/LaswitchTech/coreLogger)

### Methods
`Net` provides the following methods:

- [config()](methods/Net/config.md)
- [isInstalled()](methods/Net/isInstalled.md)
- [lookup()](methods/Net/lookup.md)
- [ping()](methods/Net/ping.md)
- [scan()](methods/Net/scan.md)

## Initiate Command for coreCLI integration
To use `Command`, simply create `Command/NetCommand.php` file and extend a new instance of the `Command` class.

```php

// Import Net class into the global namespace
// These must be at the top of your script, not inside a function
use LaswitchTech\coreNet\Command;

// Initiate the Command class
class NetCommand extends Command {}
```

### Methods
`Command` provides the following methods:

- [addAction()](methods/Command/addAction.md)
- [runAction()](methods/Command/runAction.md)

## Initiate Controller for coreAPI and/or coreRouter integration
To use `Controller`, simply create `Controller/NetController.php` file and extend a new instance of the `Controller` class.

```php

// Import Net class into the global namespace
// These must be at the top of your script, not inside a function
use LaswitchTech\coreNet\Controller;

// Initiate the Controller class
class NetController extends Controller {}
```

### Methods
`Controller` provides the following methods:

- [indexRouterAction()](methods/Controller/indexRouterAction.md)
- [pingRouterAction()](methods/Controller/pingRouterAction.md)
- [portRouterAction()](methods/Controller/portRouterAction.md)
- [lookupRouterAction()](methods/Controller/lookupRouterAction.md)
