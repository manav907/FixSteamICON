const {AsyncQueue} = require('@doctormckay/stdlib').DataStructures;
const {EventEmitter} = require('events');
const FS = require('fs');
const Path = require('path');
const Util = require('util');

Util.inherits(FileManager, EventEmitter);
module.exports = FileManager;

/**
 * Creates a new FileManager object
 * @param {string} directory - The local directory where files will be saved if events aren't listened to. No trailing slash. No nesting.
 * @constructor
 */
function FileManager(directory) {
	Object.defineProperty(this, 'directory', {
		"get": function() {
			return this._directory;
		},
		"set": function(newDir) {
			this._directory = newDir;
		}
	});

	this._directory = null;
	this.directory = directory;

	this._workerQueue = new AsyncQueue(this._work.bind(this), 100);
}

/**
 * Checks whether or not the FileManager object can store and retrieve files.
 * @returns {boolean}
 */
FileManager.prototype.isEnabled = function() {
	return (this.listeners('save').length > 0 && this.listeners('read').length > 0) || this.directory !== null;
};

/**
 * Saves a file
 * @param {string} filename - The name of the file
 * @param {Buffer|*} contents - The contents of the file
 * @return {Promise}
 */
FileManager.prototype.saveFile = FileManager.prototype.writeFile = function(filename, contents) {
	return new Promise((resolve, reject) => {
		if (!this.isEnabled()) {
			return reject(new Error("File storage system is not enabled"));
		}

		if (!Buffer.isBuffer(contents)) {
			contents = Buffer.from(contents.toString(), 'utf8');
		}

		if (this.listeners('save').length > 0) {
			this.emit('save', filename, contents, (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});

			return;
		}

		this._workerQueue.push({
			task: 'write',
			filename,
			contents
		}, (err) => {
			if (err) {
				return reject(err);
			}

			resolve();
		});
	});
};

/**
 * Saves many files
 * @param {Object} files - Keys are filenames, values are Buffer objects containing the file contents
 * @return {Promise}
 */
FileManager.prototype.saveFiles = FileManager.prototype.writeFiles = function(files) {
	return new Promise(async (resolve, reject) => {
		try {
			await Promise.all(Object.keys(files).map(filename => this.saveFile(filename, files[filename])));
			resolve();
		} catch (ex) {
			reject(ex);
		}
	});
};

/**
 * Reads the contents of a single file
 * @param {string} filename - The name of the file to read
 * @return {Promise}
 */
FileManager.prototype.readFile = function(filename) {
	return new Promise((resolve, reject) => {
		if (!this.isEnabled()) {
			return reject(new Error("File storage system is not enabled"));
		}

		if (this.listeners('read').length > 0) {
			this.emit('read', filename, (err, content) => {
				if (err) {
					reject(err);
				} else {
					resolve(content);
				}
			});

			return;
		}

		this._workerQueue.push({
			task: 'read',
			filename
		}, (err, content) => {
			if (err) {
				return reject(err);
			}

			resolve(content);
		});
	});
};

/**
 * Reads the contents of multiple files
 * @param {string[]} filenames - An array of filenames
 * @return {Promise<Array>} - Array with same order as input array, each element is an object with filename and contents properties.
 */
FileManager.prototype.readFiles = function(filenames) {
	return Promise.all(filenames.map((filename) => {
		return new Promise(async (resolve, reject) => {
			try {
				let contents = await this.readFile(filename);
				return resolve({filename, contents});
			} catch (error) {
				resolve({filename, error});
			}
		});
	}));
};

FileManager.prototype._work = function(job, callback) {
	switch (job.task) {
		case 'read':
			FS.readFile(Path.join(this.directory, job.filename), callback);
			break;

		case 'write':
			FS.writeFile(Path.join(this.directory, job.filename), job.contents, (err) => {
				if (err && err.code == 'ENOENT' && !job.retry) {
					// The root directory doesn't exist. Let's create it.
					FS.mkdir(this.directory, {recursive: true, mode: 0o750}, (err) => {
						if (err) {
							return callback(err);
						}

						// Directory created successfully.
						this._work(Object.assign(job, {retry: true}), callback);
					});

					return;
				}

				callback(err);
			});

			break;

		default:
			throw new Error(`Unknown task: ${job.task}`);
	}
};
