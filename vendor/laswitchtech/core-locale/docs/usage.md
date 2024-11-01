# Usage
## Initiate Locale
To use `Locale`, simply include the Locale.php file and create a new instance of the `Locale` class.

```php
<?php

// Import additionnal class into the global namespace
use LaswitchTech\coreLocale\Locale;

// Load Composer's autoloader
require 'vendor/autoload.php';

// Initiate Locale
$Locale = new Locale();
```

### Properties
`Locale` provides the following properties:

- [Configurator](https://github.com/LaswitchTech/coreConfigurator)
- [Logger](https://github.com/LaswitchTech/coreLogger)

### Methods
`Locale` provides the following methods:

- [add()](methods/Locale/add.md)
- [config()](methods/Locale/config.md)
- [current()](methods/Locale/current.md)
- [get()](methods/Locale/get.md)
- [isInstalled()](methods/Locale/isInstalled.md)
- [list()](methods/Locale/list.md)
- [set()](methods/Locale/set.md)
