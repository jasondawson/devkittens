module.exports = {
  entry: "./public/app.js",
  output: {
    filename: "./public/bundle.js"
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader'},
      {test: /\.less$/, loader: "style!css!less"}
    ]
  }
};