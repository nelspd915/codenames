import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
  namespace: "codenames",
  sourceMap: true,
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader",
    },
    {
      type: "dist-custom-elements",
    },
    {
      type: "docs-readme",
    },
    {
      type: "www",
      baseUrl: "/codenames",
      copy: [
        {
          src: "app/",
          dest: "app/"
        }
      ]
    },
  ],
  plugins: [sass()],
};
