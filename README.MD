A package for managing environment configurations in Bun apps

Installation
You can install this package using the following command:

```shell
bun add @jettisy/env
```
Description
@jettisy/env is a package designed to parse and validate environment variables in applications running on the Bun runtime environment. This package provides a simple and efficient way to work with your environment configurations by returning the expected data types.

Please note that this package is not intended for use with Node.js.

Usage
Setting up env.ts

When using this package in your project, you should create an env.ts file at the root of your project. Here's an example of its contents, which you can use as a TypeScript reference:

```typescript
import { Schema } from "@jettisy/env";

const rules = {
PORT: Schema.number(),
HOST: Schema.string(),
BOOL: Schema.boolean(),
OPTIONAL: Schema.string().optional(),
} as const;

export default rules;
```
In this example, we define environment variable rules using the provided Schema from @jettisy/env. The as const assertion is used to preserve the literal type information.

Using @jettisy/env

You can then use @jettisy/env to access and validate your environment variables:

```typescript
import { Env } from "@jettisy/env";

const port = Env.get("PORT");       // Returns a number
const host = Env.get("HOST");       // Returns a string
const bool = Env.get("BOOL");       // Returns a boolean
const optional = Env.get("OPTIONAL"); // Returns a string or undefined
```

The Env.get method allows you to access environment variables and ensures that they match the specified types.

Feel free to contribute to this project or report issues on GitHub.
