module.exports = {
resolve: {
  root: path.resolve(__dirname),
  entry: './index.js',
  alias: {
    app: '.',
    home: 'routes/home/',
    profile: 'routes/profile/',
    header: path.resolve('src/components/header/Header.js'),
    routeplans: path.resolve('src/routeplan/Routeplans.js'),
    util: 'util',
    textService: 'services/textService'
  },
  extensions: ['', '.js', '.jsx']
}
};