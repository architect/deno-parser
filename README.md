# Architect parser
Architect parser ported to ES Modules for use with the [deno](https://deno.land) runtime.

Test:
```
./scripts/test
```

Use:

```js
import parse from 'https://denopkg.com/architect/deno-parser/mod.js'
const arcFile = await Deno.readTextFile('mock/app.arc')
const arc = await parse(arcFile)
console.log(arc)
```
See https://github.com/architect/parser for more

