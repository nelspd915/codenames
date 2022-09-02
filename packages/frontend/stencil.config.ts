import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
  namespace: "codenames",
  globalStyle: "src/global/global.scss",
  sourceMap: true,
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader"
    },
    {
      type: "dist-custom-elements"
    },
    {
      type: "docs-readme"
    },
    {
      type: "www",
      baseUrl: "/",
      copy: [
        {
          src: "app/",
          dest: "app/"
        },
        {
          src: "CNAME",
          dest: "CNAME"
        }
      ]
    }
  ],
  plugins: [sass()]
};
