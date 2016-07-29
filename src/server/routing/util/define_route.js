import _ from 'lodash';

const verbs = ['get','post','put','delete'];
const needsIdRoute = ['get','put','delete'];

export default (router, route, url) => {
  const before = route['before'];
  const after = route['after'];

  _.forEach(verbs, (verb) => {
    if (!route[verb]) {
      return;
    }

    const handler = (req, res) => {
      if (before) {
        before(req, res, verb);
      }

      route[verb](req, res);

      if (after) {
        after(req, res, verb);
      }
    };

    router[verb](url, handler);

    // handle get /{id}
    if (_.includes(needsIdRoute, verb)) {
      router[verb](`${url}/:id`, handler);
    }
  });
};
