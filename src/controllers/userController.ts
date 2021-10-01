import { getRepository } from "typeorm"
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
import { User } from "../entity/User"


//===============      Get all users   ==========================

export const getAllUsers = async (req, res) => {
    const userRepository = getRepository(User)
    const users = await userRepository.find();
    return res.json(users);
}

//=====================  Registration ===================================

export const signUp = async (req, res) => {
    const userRepository = getRepository(User)
    const { name, email, password, role } = req.body;
    const user = new User()
    user.name = name
    user.email = email
    user.role = role
    user.password = await bcrypt.hashSync(password, 10)
    const userRepeat = await userRepository.findOne({email: req.body.email});
    if(!userRepeat){
        const results = await userRepository.save(user)
        console.log(results);
        return res.send({message : `Registration is succesfull `});
    } else {
        return res.send({message : `User with this ${email} is already exists.`})
    }
   
}
//=====================  Authorization with authentication  =========================================

export const signIn = async (req, res) => {
    const userRepository = getRepository(User)
    const { email, password } =  req.body;
    //Проверка существует ли данный email
    const user = await userRepository.findOne({email: email});
    if (!user) return res.status(404).send('User is not Found');
    //Проверка правильности пароля
    const validPass = await bcrypt.compare(password, user.password);
    if(!validPass) return res.status(401).send('Unauthorized');
    //Создание и присваивание токена
    const token = jwt.sign({id: user.id, name: user.name, role: user.role}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
    res.send('Logged in!');
}



//==============    Get user by ID ===================================
export const userById = async (req, res) => {
    const userRepository = getRepository(User)
    const results = await userRepository.findOne({id : req.params.user_id});
    return res.send(results);
}

//============   Update user ================================


export const updateUser = async (req, res) => {
    const userRepository = getRepository(User)
    const user = await userRepository.findOne({id :req.params.user_id});
    userRepository.merge(user, req.body);
    const results = await userRepository.save(user);
    return res.send(results);
}

//============= Delete User =====================================

export const deleteUser = async (req, res) => {
    const userRepository = getRepository(User)
    const results = await userRepository.delete({id: req.params.user_id});
    return res.send(results);
    
}
