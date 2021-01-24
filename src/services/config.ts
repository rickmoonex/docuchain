import _ from "lodash";

import * as config from "../config.json";

export default function getConfig(): Record<string, unknown> {
    const defaultConfig = config.development;
    const environment = process.env.NODE_ENV || "development";
    const environmentConfig = config[environment];
    const finalConfig = _.merge(defaultConfig, environmentConfig);
    return finalConfig;
}
