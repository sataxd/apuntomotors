import { Fetch } from "sode-extend-react";
import BasicRest from "../BasicRest";

class ShippingCostRest extends BasicRest {
  
  path = 'admin/shipping'

  getAvailableDistricts = async (provinceId, currentId = null) => {
      try {
          const { status, result } = await Fetch(`/api/${this.path}/available-districts`, {
              method: "POST",
              body: JSON.stringify({
                  province_id: provinceId,
                  current_id: currentId
              })
          });
          if (!status) return [];
          return result ?? [];
      } catch (error) {
          console.error("Error obteniendo distritos:", error);
          return [];
      }
  };
}

export default ShippingCostRest