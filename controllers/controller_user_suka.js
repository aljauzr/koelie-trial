import UserSuka from "../models/model_user_suka.js";
import Pekerja from "../models/model_pekerja.js";

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
    const pekerjaIds = userSuka.map((like) => like.pekerja_id);
    const showPekerja = await Pekerja.findAll({
      where: {
        id: pekerjaIds
      },
      order: [['id', 'DESC']] // Sorts response (descending) by the 'id' column in the 'pekerja' table
    });
    if (!showPekerja) {
      return res.status(404).json({ message: "Pekerja not found" });
    }
    res.status(200).json(showPekerja);
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
        pekerja_id: req.body.pekerja_id
      }
    });
    if (likeAlreadyExist) {
      return res.status(400).json({ message: "Pekerja sudah dilike oleh user." });
    }

    const userSuka = await UserSuka.create({
      user_id: req.params.user_id,
      pekerja_id: req.body.pekerja_id
    });

    // Update the like_count column in the Pekerja table
    await Pekerja.increment('jumlah_suka', { where: { id: req.body.pekerja_id } });

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
        pekerja_id: req.params.pekerja_id
      }
    });
    if (!userSukaExist) {
      return res.status(400).json({ message: "User like tidak ada/sudah dihapus." });
    }

    await UserSuka.destroy({
      where: {
        user_id: req.params.user_id,
        pekerja_id: req.params.pekerja_id
      }
    });

    // Update the like_count column in the Pekerja table by decrementing
    await Pekerja.decrement('jumlah_suka', { where: { id: req.params.pekerja_id } });

    res.status(200).json({ message: "User like berhasil dihapus." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
