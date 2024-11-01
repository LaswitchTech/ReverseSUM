# config([string $option, string $value])
This method is used to configure the logger. It takes two parameters, the option to configure and the value to set it to.

```php
$Logger->config('level', 5);
```

## List of configurations
- `level` - The level of logging to use. This can be any of the following:
  - `0` - No logging
  - `1` - Errors only
  - `2` - Warnings and errors
  - `3` - Information, warnings, and errors
  - `4` - Success, information, warnings, and errors
  - `5` - Debug, Success, information, warnings, and errors
- `rotation` - Should the log files be rotated.
  - `true` - Rotate log files
  - `false` - Do not rotate log files
- `ip` - Should the log files include ips.
  - `true` - Include ips
  - `false` - Do not include ips
