# set($file, $configuration, $parameters = [])
This method is used to set a configuration parameter necessary to generate a form.

```php
$Form->set('example', 'hostname', [
    'type' => 'text',
    'label' => 'Database Host',
    'default' => 'localhost',
    'required' => true,
    'placeholder' => 'localhost',
    'tooltip' => 'Enter the database host',
    'color' => 'primary',
    'icon' => 'database',
    'options' => [],
]);
```
