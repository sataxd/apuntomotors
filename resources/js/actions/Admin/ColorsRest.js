import { Cookies } from "sode-extend-react";
import BasicRest from "../BasicRest";
let controller = new AbortController();
class ColorsRest extends BasicRest {
    path = "admin/colors";
    hasFiles = true;

    list = async (params) => {
        controller.abort("Nothing");
        controller = new AbortController();
        const signal = controller.signal;
        const res = await fetch(`/api/${this.path}/list`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-Xsrf-Token": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
            },
            body: JSON.stringify(params),
            signal,
        });
        return await res.json();
    };
}

export default ColorsRest;
