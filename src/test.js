import zenExpress from './index';

zenExpress({
  spa: false,
  port: 3100,

  db: {
    type: 'mongo',
    connection: 'mongodb://oz-test:34dnjJSTko9BWYwBVPzN0@ds023465.mlab.com:23465/oz-test'
  }
});
