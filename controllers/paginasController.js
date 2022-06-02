import { Viaje } from "../models/Viajes.js";
import { testimonial } from "../models/Testimoniales.js";

//=============== pagina inicio ===============
const paginaInicio = async (req, res) => {
    //=============== consultar 3 viajes del modelo vVaje ===============
    try {
        const promiseDB = [];
        promiseDB.push(Viaje.findAll({ limit: 3 }));
        promiseDB.push(testimonial.findAll({ limit: 3 }));

        const resultado = await Promise.all(promiseDB);

        res.render("inicio", {
            pagina: "Inicio",
            clase: "home",
            viajes: resultado[0],
            testimoniales: resultado[1],
        });
    } catch (error) {
        console.error(error);
    }
};

//=============== pagina nosotros ===============
const paginaNosotros = (req, res) => {
    res.render("nosotros", {
        pagina: "nosotros",
    });
};

//=============== pagina viajes ===============
const paginaViajes = async (req, res) => {
    try {
        // consultar base de datos
        const viajes = await Viaje.findAll();

        res.render("viajes", {
            pagina: "Proximos viajes",
            viajes,
        });
    } catch (error) {
        console.error(error);
    }
};

//=============== pagina detalle de viaje ===============
const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params;

    try {
        const resultado = await Viaje.findOne({ where: { slug: slug } });

        res.render("viajeDetalle", {
            pagina: "Informacion Viaje",
            resultado,
        });
    } catch (error) {
        console.error(error);
    }
};

//=============== pagina testimoniales ===============
const paginaTestimoniales = async (req, res) => {
    try {
        const testimoniales = await testimonial.findAll();

        res.render("testimoniales", {
            pagina: "testimoniales",
            testimoniales,
        });
    } catch (error) {
        console.error(error);
    }
};

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje,
};
