const PackageSchema = mongoose.Schema({
    numeroSeguimiento: {
      type: String,
      required: true,
      unique: true
    },
    estado: {
      type: String,
      required: true,
      enum: ['en tránsito', 'en bodega', 'entregado'],
      default: 'en tránsito'
    },
    ubicacionActual: {
      type: String,
      required: true
    },
    fechaEntrega: Date,
    propietario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true
    }
  });
  