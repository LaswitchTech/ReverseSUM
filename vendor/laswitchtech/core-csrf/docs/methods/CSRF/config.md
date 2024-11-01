# config(string $option, string $value)
This method is used to set the configuration options for the module.

```php
$CSRF->config('field', 'csrf_token');
```

## Available Options
- `field` : The key($_POST or $_GET) to use for the CSRF token.
- `length` : The length of the CSRF token.
