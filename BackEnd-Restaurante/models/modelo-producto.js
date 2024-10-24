const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  precio: { type: Number, required: true },
  categoria: {
    type: String,
    enum: ["Hamburguesas", "Complementos", "Bebidas", "Postres"],
    required: true,
  },
  foto: { type: String},
  disponible: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Producto", productoSchema);
