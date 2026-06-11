import {defineConfig, type OxfmtConfig} from "oxfmt"

import config from "@qualcomm-ui/oxfmt-config"
import {mergeProps} from "@qualcomm-ui/utils/merge-props"

export default defineConfig(
  mergeProps(config, {
    // override settings here, and they will be deeply merged with the QUI config.
  } satisfies OxfmtConfig),
)
