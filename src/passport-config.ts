import passport, { use } from 'passport';
import LocalStrategy from 'passport-local';
import User from './db';

const cacheData : Map<Number, User>= new Map()

passport.use(
  new LocalStrategy.Strategy((username : string, password : string, done) => {
    User.findOne({ where: { username } }).then(user => {
      if (! user) {
        return done(null, false, { message: 'Неправильное имя пользователя' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Неправильный пароль' });
      }

      return done(null, user);
    }).catch(err => {
      console.log(err)
      return done(err);
    });
  })
);

passport.serializeUser((user, done) => {
  console.log('serialise')

  const id: number = (user as User).id

  if (! cacheData.has(id)){
    cacheData.set(id, user as User)
  }
  done(null, (user as User).id);
});


passport.deserializeUser((id: number, done) => {
  console.log('deserialise')
  console.log(cacheData)
  console.log(cacheData.has(id))


  if (cacheData.has(id)){
    return done(null, cacheData.get(id))
  }
  // Извлекаем пользователя из базы данных по идентификатору
  console.log('и нахуя')
  User.findOne({where: {id}})
    .then(user => {
      if (!user) {
        // Если пользователь не найден, передаем null вместо user
        done(null, null);
      } else {
        // Передаем пользователя в done
        cacheData.set(id, user)
        done(null, user);
      }
    })
    .catch(err => {
      // Обрабатываем ошибку, передавая ее в done
      done(err, null);
    });
});

