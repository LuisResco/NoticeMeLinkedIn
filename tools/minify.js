const compressor = require('node-minify');

compressor.minify({
    compressor: 'gcc',
    input: './src/index.js',
    output: './dist/noticeMeLinkedIn.js',
    callback: (err, min) => { }
});

