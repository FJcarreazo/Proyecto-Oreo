const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { PAGE_URL } = require('../config');

usersRouter.get('/', async (request, response) => {
  try {
    const userList = await User.find();
    return response.status(200).json(userList);
  } catch (error) {
    return response.status(400).json(error);
  }
});

usersRouter.post('/', async (request, response) => {
  const { name, email, selector, telefono, password } = request.body


  if (!name || !email || !telefono || !selector || !password) {
    return response.status(400).json({ error: 'Todos los espacio son requeridos' });
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    return response.status(400).json({ error: 'El email ya se encuentra en uso' });
  }


  const saltRounds = 10;

  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    name,
    email,
    telefono: `${selector}${telefono}`,
    passwordHash,
  });

  const savedUser = await newUser.save();
  const token = jwt.sign({ id: savedUser.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1m'
  });

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });


  await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: savedUser.email, // list of receivers
    subject: 'verficacion de usuario', // Subject line
    html: `<a href="${PAGE_URL}/verify/${savedUser.id}/${token}">Verificar correo</a>`, // html body
  });

  return response.status(201).json('Usuario creado. Por favor verifica tu correo');


});

usersRouter.patch('/:id/:token', async (request, response) => {
  try {
    const token = request.params.token;
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const id = decodedToken.id;
    await User.findByIdAndUpdate(id, { verified: true });
    return response.sendStatus(200)
  } catch (error) {
    // Encontrar el Email del usuario
    const id = request.params.id;
    const { email } = await User.findById(id);

    // Firmar el nuevo token 
    const token = jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1m'
    });

    // Enviar el email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });


    await transporter.sendMail({
      from: process.env.EMAIL_USER, // sender address
      to: email, // list of receivers
      subject: 'verficacion de usuario', // Subject line
      html: `<a href="${PAGE_URL}/verify/${id}/${token}">Verificar correo</a>`, // html body
    });

    return response.status(400).json({ error: 'El link ya expiro. Se ha enviado un nuevo link de verificacion a su correo' });
  }
});

usersRouter.delete('/delete', async (request, response) => {
  const deleteUser = await User.deleteOne({_id: request.params.id});
  if (!deleteUser) {
    return response.status(500).json({ error: 'No se puedo eliminar el usuario'});
  }
  return response.status(200).json('Usuario eliminado')
});

usersRouter.patch('/update', async (request, response) => {
  const updateParams = {
    name: request.body.name,
    email: request.body.email, 
    telefono: request.body.telefono, 
    passwordHash: request.body.passwordHash, 
  }
  const updateUsers = await Usersers.findByIdAndUpdate(request.params.id, updateParams, {new: true});
  if (!updateUsers) {
    return response.status(500).json({ error: 'No se ha podido actualizar el usuario'})
  }
  return response.status(200).json(updateUsers);

});

module.exports = usersRouter;