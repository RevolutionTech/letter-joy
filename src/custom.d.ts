/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "*.svg" {
  const content: any;
  export default content;
}

// Dependencies without types
declare module "react-textfit";
