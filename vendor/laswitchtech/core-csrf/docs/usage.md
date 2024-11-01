# Usage
## Initiate CSRF
To use `CSRF`, simply include the CSRF.php file and create a new instance of the `CSRF` class.

```php
<?php

// Import additionnal class into the global namespace
use LaswitchTech\coreCSRF\CSRF;

// Load Composer's autoloader
require 'vendor/autoload.php';

// Initiate CSRF
$CSRF = new CSRF();
```

### Properties
`CSRF` provides the following properties:

- [Configurator](https://github.com/LaswitchTech/coreConfigurator)
- [Logger](https://github.com/LaswitchTech/coreLogger)

### Methods
`CSRF` provides the following methods:

- [config()](methods/CSRF/config.md)
- [generate()](methods/CSRF/generate.md)
- [token()](methods/CSRF/token.md)
- [validate()](methods/CSRF/validate.md)
