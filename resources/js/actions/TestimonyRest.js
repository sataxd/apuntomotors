import { Fetch } from "sode-extend-react";
import BasicRest from "./BasicRest";

class TestimonyRest extends BasicRest {
    path = "testimonies";

    getTestimonies = async () => {
        try {
            const { status, result } = await Fetch(
                `/api/${this.path}/get-testimonies`,
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
}

export default TestimonyRest;
