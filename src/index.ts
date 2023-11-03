import express, { Request, Response } from 'express';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import Database from './db'
import User from './user'
import https from 'https';
import fs from 'fs';
import { serializeUser, deserializeUser } from 'passport';
import path from 'path';
import './passport-config'

require('dotenv').config();
console.log(User)
// import exp from 'constants';
const rootFolder = path.resolve(__dirname, '../');



const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

const app = express();
const server = https.createServer(options, app);

const host = 'localhost'
const port = 8443;

app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(`${rootFolder}/public/loginForm/index.html`)
})

app.use(session({
  secret: (() => {
    const secretKey = process.env.SECRET_KEY as string; // Преобразование в тип string
    
    if (!secretKey) {
      throw new Error('Секретный ключ не установлен в переменных окружения.');
    }
    return secretKey as string;
  })(),
  resave: false,
  saveUninitialized: true,
}));


app.get('/', (req: Request, res: Response) => {
  res.send('Привет, мир!');
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Разрешить доступ с любого источника
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json())
app.use(passport.initialize());
app.use(passport.session());



app.post('/login', (req: Request, res: Response, next) => {
  console.log('login')

  const { username = null, password = null} = req.body; // Парсинг данных из POST-запроса

  if (! (username && password)) {
    return res.status(400).json({ message: "Отсутствует имя пользователя и/или пароль" });
  }

  console.log(username, password)
  passport.authenticate('local', (err: Error, user: Database, info: { message: string }) => {
    if (err) {
      console.log(err)
      // Обработка ошибки
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
    if (!user) {
      // Пользователь не аутентифицирован
      return res.status(401).json({ message: 'Неправильное имя пользователя или пароль' });
    }

    // const user = new User(userdata.id, userdata.username, userdata.password)

    // console.log(user)
    // Если аутентификация успешна, вы можете создать сессию
    req.login(user, (loginErr) => {
      if (loginErr) {
        console.log(loginErr)
        return res.status(500).json({ message: 'Ошибка сервера' });
      }
      console.log('suckass')
      return res.status(200).json({ message: 'Авторизация успешна' });
    });
  })(req, res, next);
});



// Запустите HTTPS сервер
server.listen(port, host, () => {
  console.log(`Сервер HTTPS запущен на https://${host}:${port}`);
});
