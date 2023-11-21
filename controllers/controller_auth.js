import User from "../models/model_user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

// User registration
export const Register = async(req,res) => {
    const { email, no_hp, password, confPassword, nama, provinsi} =  req.body;

    // Duplicate email check
    const emailAlreadyExist = await User.findOne({
        where: {
            email: email
        }
    });
    // Duplicate phone number check
    const phoneAlreadyExist = await User.findOne({
        where: {
            no_hp: no_hp
        }
    });
    // Validates phone number (ID)
    function validatePhoneNumber(phoneNumber) {
      const cleanedNumber = phoneNumber.replace(/\\\\\\\\D/g, "");
      if (!validator.isMobilePhone(cleanedNumber, "id-ID")) {
        return false;
      }
      return true;
    }

    try {
        if (validator.isEmail(req.body.email) === false) {
            throw { code: 400, message: "Email not valid." };
        }
        if (emailAlreadyExist) {
            throw { code: 400, message: "Email already registered." };
        }
        if (!validatePhoneNumber(req.body.no_hp)) {
            throw { code: 400, message: "Invalid phone number." };
        }
        if (phoneAlreadyExist) {
            throw { code: 400, message: "Phone number already registered." };
        }
        if (password.length < 8) {
            throw { code: 400, message: "Password must be at least 8 characters." };
        }
        if (password !== confPassword) {
            return res.status(400).json({msg:"Password doesn't match."});
        }
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        await User.create({
            email: email,
            no_hp: no_hp,
            password: hashPassword,
            nama: nama,
            provinsi: provinsi
        });
        res.json({msg:"Registration successful."})
    } catch (error) {
        console.log(error);
        if (error.code === 400) {
            res.status(400).json({msg:error.message});
        } else {
            res.status(500).json({msg:"Server error."});
        }
    }
}

// User login
export const Login = async(req,res) =>{
    try {
        const user = await User.findAll({
            where:{
                email: req.body.email
            }
        });
        if (user.length === 0) {
            throw { code: 404, message: "Email not registered." };
        }
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) return res.status(400).json({msg:"Incorrect password."});
        const id = user[0].id;
        const email = user[0].email;
        const no_hp = user[0].no_hp;
        const nama = user[0].nama;
        const provinsi = user[0].provinsi;
        const accessToken = jwt.sign({id, email, no_hp, nama, provinsi}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30d'
        });
        const refreshToken = jwt.sign({id, email, no_hp, nama, provinsi}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '30d'
        });
        await User.update({refresh_token: refreshToken}, {
            where:{
                id: id
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24*60*60*1000,
            //secure: true
        });
        res.json({id, accessToken});
    } catch (error) {
        console.log(error);
        if (error.code === 404) {
            res.status(404).json({msg:error.message});
        } else {
            res.status(500).json({msg:"Server error."});
        }
    }
}

// User logout
export const Logout = async(req, res)=>{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await User.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const id=user[0].id;
    await User.update({refresh_token:null},{
        where:{
            id: id
        }
    });
    res.clearCookie('refreshToken');
    res.sendStatus(204);
}