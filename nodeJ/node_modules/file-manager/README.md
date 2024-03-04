# file-manager

This simple module is designed to be an abstraction for file storage. By default, it saves files to disk in a specified
directory, but it can easily be overridden to save files to anywhere you want, e.g. a database.


# API

### Constructor(storageDirectory)
- `storageDirectory` - The directory on the local disk where files will be stored. Use `null` to disable local disk storage.

```js
const FileManager = require('file-manager');
const Path = require('path');
let manager = new FileManager(Path.join(__dirname, 'data'));
```

### isEnabled()

Returns `true` if either a storage directory is set, or if save and read handlers have been registered.

### saveFile(filename, contents)
- `filename` - Obvious
- `contents` - Either a `Buffer`, or some other value that will have `.toString()` called on it, then it will be converted to a `Buffer` by interpreting the string as UTF-8

Saves a file. Returns a `Promise` that will be fulfilled once the file is saved, or rejected if there's an error.

**Alias: `writeFile`**

### saveFiles(files)
- `files` - An object where keys are filenames and values are file contents

Saves multiple files. Returns a `Promise` that will be fulfilled once all files are saved, or rejected if there's an error saving any file

**Alias: `writeFiles`**

### readFile(filename)
- `filename` - Obvious

Reads a single file. Returns a `Promise` that fulfills to its content, as a `Buffer`. Rejects if there's an error or the file doesn't exist.

### readFiles(filenames)
- `filenames` - Array of filenames

Reads multiple files. Returns a `Promise` that fulfills to an array containing objects of this structure:

- `filename` - The name of this file
- `contents` - The content of this file, if reading succeeded
- `error` - An `Error` object, if there was an error reading this file (e.g. it doesn't exist)

This function can never reject.

## Events

You can register your own save/read handlers by attaching event listeners.

### read
- `filename` - The filename of the file we want to read
- `callback` - A function you should call once this file's contents are available, or an error occurred
	- `err` - An `Error` object if there was an error reading this file (e.g. it doesn't exist). `null` if no error.
	- `contents` - A `Buffer` containing the file's content, if reading succeeded

Emitted when a file is requested to be read.

### save
- `filename` - The filename of the file we want to save
- `contents` - The content we want to save to this file, as a `Buffer`
- `callback` - A function you should call once this file has been saved, or an error occurred
	- `err` - An `Error` object if there was an error saving this file. `null` if no error.
	
Emitted when a file is requested to be saved.

## Properties

### directory

The local disk storage directory location can be changed at any time by assigning to the `directory` property.
