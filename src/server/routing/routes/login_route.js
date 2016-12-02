import bcrypt from 'bcrypt';
import { DATABASE } from './database';
import AdminUser from '../models/admin_user';

const validatePassword = (req, res, username, password) => {
  const db = req.app.get(DATABASE);
  const User = db.buildFromModel(AdminUser);

  const fail = (err) => {
    res.status(500).send(err || 'Invalid username & password');
  };

  db.find(User, { username })
    .then((users) => {
      if (users.length === 0) {
        return fail();
      }

      const user = users[0];
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) {
          return done(err);
        }

        if (!res) {
          return fail();
        }

        res.json(user);
      });
    }).catch((err) => {
      fail(err);
    });
};

export default class LoginRoute {
  post(req, res) {
    validatePassword(req, res, req.body.username, req.body.password);
  }
}
