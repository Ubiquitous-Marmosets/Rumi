module.exports = {
  entry: "./client/App.jsx",
  output: {
    path: __dirname,
    filename: "./dist/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
