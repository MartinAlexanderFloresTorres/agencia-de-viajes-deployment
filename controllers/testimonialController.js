import { testimonial } from "../models/Testimoniales.js";

//=============== pagina de guardar testimonail ===============
export const guardarTestimonial = async (req, res) => {
    // validar
    const { nombre, correo, mensaje } = req.body;

    const errores = [];

    if (nombre.trim() === "") {
        errores.push({ mensaje: "El nombre esta vacio" });
    }

    if (correo.trim() === "") {
        errores.push({ mensaje: "El correo esta vacio" });
    }

    if (mensaje.trim() === "") {
        errores.push({ mensaje: "El mensaje esta vacio" });
    }

    if (errores.length > 0) {
        //=============== consultar los testimoniales ===============
        const testimoniales = await testimonial.findAll();

        //=============== mostrar la vista con errores ===============
        res.render("testimoniales", {
            pagina: "Testimoniales",
            testimoniales,
            errores,
            nombre,
            correo,
            mensaje,
        });
    } else {
        //=============== almacenarlo en la base de datos ===============
        try {
            await testimonial.create({
                nombre,
                correo,
                mensaje,
            });

            res.redirect("testimoniales");
        } catch (error) {
            console.error(error);
        }
    }
};
