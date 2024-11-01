# listRouterAction([boolean $all (optional)])
This method is used to list all the available configurations. It takes one optional parameter: a boolean value that determines whether to list all configurations or only the active ones.

## List Configuration files
To retrieve the list of configuration files, use the `listRouterAction()` method by adding `'action': 'configurator/list'` in your route. This method takes one optional $_GET parameter: a boolean value that determines whether to list all configurations or only the active ones. The method returns an array of all the configuration files.

```php
// In your view file
$this->Return
```
