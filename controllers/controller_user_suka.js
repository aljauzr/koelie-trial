import UserSuka from "../models/model_user_suka.js";
import Kuli from "../models/model_kuli.js";

export const getUserSuka = async (req, res) => {
  try {
    const userSuka = await UserSuka.findAll({
      where: {
        user_id: req.params.user_id
      }
    });
    if (!userSuka) {
      return res.status(404).json({ message: "User likes not found" });
    }
    const kuliIds = userSuka.map((like) => like.kuli_id);
    const showKuli = await Kuli.findAll({
      where: {
        id: kuliIds
      },
      order: [['id', 'DESC']] // Sorts response (descending) by the 'id' column in the 'kuli' table
    });
    if (!showKuli) {
      return res.status(404).json({ message: "Kuli not found" });
    }
    res.status(200).json(showKuli);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const postUserSuka = async (req, res) => {
  try {
    const likeAlreadyExist = await UserSuka.findOne({
      where: {
        user_id: req.params.user_id,
        kuli_id: req.body.kuli_id
      }
    });
    if (likeAlreadyExist) {
      return res.status(400).json({ message: "Kuli sudah dilike oleh user." });
    }

    const userSuka = await UserSuka.create({
      user_id: req.params.user_id,
      kuli_id: req.body.kuli_id
    });

    // Update the like_count column in the Kuli table
    await Kuli.increment('jumlah_suka', { where: { id: req.body.kuli_id } });

    res.status(201).json(userSuka);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteUserSuka = async (req, res) => {
  try {
    const userSukaExist = await UserSuka.findOne({
      where: {
        user_id: req.params.user_id,
        kuli_id: req.params.kuli_id
      }
    });
    if (!userSukaExist) {
      return res.status(400).json({ message: "User like tidak ada/sudah dihapus." });
    }

    await UserSuka.destroy({
      where: {
        user_id: req.params.user_id,
        kuli_id: req.params.kuli_id
      }
    });

    // Update the like_count column in the Kuli table by decrementing
    await Kuli.decrement('jumlah_suka', { where: { id: req.params.kuli_id } });

    res.status(200).json({ message: "User like berhasil dihapus." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
