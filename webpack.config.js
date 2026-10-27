import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: './src/main.ts',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(process.cwd(), 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: 'html-loader', // Allows importing external HTML views as template strings
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    proxy: [
      {
        context: ['/api-artic'],
        target: 'https://api.artic.edu',
        changeOrigin: true,
        pathRewrite: { '^/api-artic': '' },
      },
    ],
    port: 3000,
    hot: true,
    historyApiFallback: true, // Crucial for client-side routing routes
  },
};
