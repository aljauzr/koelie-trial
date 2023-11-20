import User from "../models/model_user.js";

export const getAllUser = async(req, res) => {
  try {
      const user = await User.findAll({
          attributes:[
              'id',
              'email',
              'no_hp',
              'nama',
              'provinsi',
          ]
      });
      res.json(user);
  } catch (error) {
      console.log(error);
      res.status(500).json({msg:"Server error."});
  }
}

export const getUserById = async(req,res) => {
  const id = req.params.id;
  try {
      const user = await User.findByPk(id, {
          attributes:[
              'id',
              'email',
              'no_hp',
              'nama',
              'provinsi',
          ]
      });
      if (!user) {
          res.status(404).json({msg:"User not found."});
      } else {
          res.json(user);
      }
  } catch (error) {
      console.log(error);
      res.status(500).json({msg:"Server error."});
  }
}