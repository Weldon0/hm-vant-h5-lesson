import request from "@/utils/request";
import { curry } from "lodash";
const post = curry(request.post, 2);
export const register = post("/user/register");
export const login = post("/user/login");
