# getParams([string $type, string $Key = null])
This method is used to retrieve the parameters from the URL. If a key is provided, the value of the key will be returned. If no key is provided, an array of all parameters will be returned. The type parameter is used to specify the type of parameters to retrieve. The type parameter is not case sensitive.

```php
$_GET = $this->getParams('get');
$_POST = $this->getParams('Post');
$_REQUEST = $this->getParams('REQUEST');
```
