const { Router } = require("express");
const pokemonsRouter = require("./rutas/pokemon");
const typesRouter = require("../routes/rutas/types");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

//routes para separar las rutas de pokeomns y la ruta de types
router.use("/pokemons", pokemonsRouter);
router.use("/types", typesRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
