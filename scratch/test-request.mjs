import http from 'http';

http.get('http://localhost:3000/opstar-profit', (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  process.exit(0);
}).on('error', (err) => {
  console.error(`Request failed: ${err.message}`);
  process.exit(1);
});
