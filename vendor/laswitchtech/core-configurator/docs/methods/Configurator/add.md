# add()
This method is used to add a new configuration file to the configurator. It takes two parameters: the name of the configuration file and an optional path to the file. If the path is not provided, the method will look for the configuration file in the default directory.

```php
$Configurator->add('my_config');
```

### Add a configuration file from a custom directory
```php
$Configurator->add('my_config', '/custom/path/to/my_config.cfg');
```
