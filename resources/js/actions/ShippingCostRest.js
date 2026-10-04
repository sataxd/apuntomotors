import { Fetch } from "sode-extend-react";
import BasicRest from "./BasicRest";

class ShippingCostRest extends BasicRest {
    path = "shipping";

    // Renombramos la función para que tenga sentido con lo que hace
    calculate = async (zone, district_id) => {
        try {
            const { status, result } = await Fetch(
                `/api/${this.path}/calculate`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        zone: zone,
                        district_id: district_id // <-- ESTO ES CLAVE PARA QUE CALCULE
                    })
                }
            );

            if (!status) throw new Error(result?.message ?? "Error de cobertura");
            
            return result?.data ?? null;
        } catch (error) {
            console.log("Error calculando envío:", error);
            return null;
        }
    };
}

export default ShippingCostRest;