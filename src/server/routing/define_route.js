import _ from 'lodash';

const verbs = ['get','post','put','delete'];

export default (router, route, url, before, after) => {
  _.forEach(verbs, (verb) => {
    if (!route[verb]) {
      return;
    }

    console.log(url);

    router[verb](url, (req, res) => {
      if (before) {
        before(req, res, verb);
      }

      route[verb](req, res);

      if (after) {
        after(req, res, verb);
      }
    });
  });
};
