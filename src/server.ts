import http from 'http';
import app from './app';

const server = http.createServer(app);
server.listen(5500, 'localhost', () => {
    console.log(`Server is running on http://${'localhost'}:${'5500'}`);
});