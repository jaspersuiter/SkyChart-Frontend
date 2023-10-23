import IEnvironment from "./env.interface";

const SKYCHART_API_URL = "$SKYCHART_API_URL";

export const env: IEnvironment = {
  SKYCHART_API_URL: SKYCHART_API_URL.includes("SKYCHART_API_URL")
    ? "http://localhost:5201"
    : SKYCHART_API_URL,
};
