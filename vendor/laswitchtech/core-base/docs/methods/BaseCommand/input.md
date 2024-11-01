# input([string $string, array $options = null, string $default = null])
This method is used to request input from the user in the command-line interface.

```php
$this->input("What is your name?", null, "John Doe");
$this->input("Are you sure?", ["yes", "no"], "yes");
```
