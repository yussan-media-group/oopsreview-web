const html = `<!DOCTYPE html>   
<html lang="en">
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
      <title>Oopsreview - Software Review Specialist</title>
  </head>
  <body>
      <div id="app"></div>
      <script src="/build/app.js"></script>
  </body>
</html>`

export default (req,res, next) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write(html)
  res.end()
}