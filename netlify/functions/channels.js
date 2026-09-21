import { handleRequest } from "../lib/channels-api.js";

export default (request) => handleRequest(request);

export const config = { path: "/api/channels" };
