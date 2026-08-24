import { Fetch } from "sode-extend-react";
import BasicRest from "./BasicRest";

class GeneralRest extends BasicRest {
    path = "generals";

    getSocials = async () => {
        try {
            const { status, result } = await Fetch(
                `/api/${this.path}/get-socials`,
                {
                    method: "GET",
                }
            );

            if (!status)
                throw new Error(
                    result?.message ?? "Ocurrió un error al consultar"
                );

            return result?.data ?? [];
        } catch (error) {
            console.error("Error en getSocials:", error);
            return [];
        }
    };

    getBenefits = async () => {
        try {
            const { status, result } = await Fetch(
                `/api/${this.path}/get-benefits`,
                {
                    method: "GET",
                }
            );
            //console.log("Respuesta completa:", status, result);
            if (!status)
                throw new Error(
                    result?.message ?? "Ocurrió un error al consultar"
                );
            //console.log(result);

            return result?.data ?? [];
        } catch (error) {
            console.log("Error en getSocials:", error);
            return [];
        }
    };

    getAboutuses = async () => {
        try {
            const { status, result } = await Fetch(
                `/api/${this.path}/get-aboutuses`,
                {
                    method: "GET",
                }
            );

            if (!status)
                throw new Error(
                    result?.message ?? "Ocurrió un error al consultar"
                );

            return result?.data ?? [];
        } catch (error) {
            console.error("Error en getAboutuses:", error);
            return [];
        }
    };

    getBlogs = async () => {
        try {
            const { status, result } = await Fetch(
                `/api/${this.path}/get-blogs`,
                {
                    method: "GET",
                }
            );

            if (!status)
                throw new Error(
                    result?.message ?? "Ocurrió un error al consultar"
                );

            return result?.data ?? [];
        } catch (error) {
            console.error("Error en getBlogs:", error);
            return [];
        }
    };

    getSession = async () => {
        try {
            const { status, result } = await Fetch(
                `/api/${this.path}/get-session`,
                {
                    method: "GET",
                }
            );

            if (!status)
                throw new Error(
                    result?.message ?? "Ocurrió un error al consultar"
                );

            return result?.data ?? [];
        } catch (error) {
            console.error("Error en getAboutuses:", error);
            return [];
        }
    };
}

export default GeneralRest;
