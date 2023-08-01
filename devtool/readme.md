# Devtool

## Why

typescript is a bit of a pain, and sveltekit auto generated types is not suit my requirements

## How

1. we watch for file changes
2. create global type
3. so we can use dynamic automated import with type safety

## Usage

```bash
node devtool <arg>
```

arg is the file that want to be generated  
is a list of filename in handler separated by comma

```bash
node devtool db,api
```
