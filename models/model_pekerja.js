import { Sequelize } from "sequelize";
import db from "../database/database.js";

const { DataTypes } = Sequelize;

const Pekerja = db.define(
  "pekerja",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tipe: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "Kuli",
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    foto: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    provinsi: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    kota: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    biaya_jasa: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "120.000",
    },
    tanggal_lahir: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    jumlah_suka: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "Tersedia",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Pekerja;