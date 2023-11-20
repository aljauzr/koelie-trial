import Kuli from "../models/model_kuli.js";

export const getAllKuli = async (req, res) => {
  try {
    const kuli = await Kuli.findAll();
    res.status(200).json(kuli);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getKuliById = async (req, res) => {
  try {
    const kuli = await Kuli.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (kuli) {
      res.status(200).json(kuli);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};