const http = require('http');
const querystring = require('querystring');
const url = require('url');
const axios = require('axios');

const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  let query = querystring.parse(url.parse(req.url).query);
  let pathname = url.parse(req.url).pathname;
  let origin = "https://api.github.com/repos/" + query.repo;
  // 주소창에 127.0.0.1:3000/?repo=nodejs%2Fnode 입력
  axios.get(origin)
    .then(function (response) {
      let stargazers = response.data.stargazers_count;
      let issues = response.data.open_issues_count;
      let result = "Repo: " + query.repo + "\n" + "stargazers_count: " + stargazers + "\n" + "open_issues_count: " + issues;
      res.end(result);
    })
    .catch(function (error) {
      if (pathname != "/") {
        res.end("Page Not Found!");
      }
      if (!query.repo) {
        res.end("Invalid Query!");
      }
      else {
        res.end("Repository not found!");
      }
      console.log(error.message);
    })
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});