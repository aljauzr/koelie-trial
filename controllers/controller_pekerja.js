import Pekerja from "../models/model_pekerja.js";

export const getAllPekerja = async (req, res) => {
  try {
    const pekerja = await Pekerja.findAll();
    res.status(200).json(pekerja);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getPekerjaById = async (req, res) => {
  try {
    const pekerja = await Pekerja.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (pekerja) {
      res.status(200).json(pekerja);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllKuli = async (req, res) => {
  try {
    const pekerja = await Pekerja.All({
      where: {
        tipe: "Kuli"
      },
    });
    if (pekerja) {
      res.status(200).json(pekerja);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllMandor = async (req, res) => {
  try {
    const pekerja = await Pekerja.findAll({
      where: {
        tipe: "Mandor"
      },
    });
    if (pekerja) {
      res.status(200).json(pekerja);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};