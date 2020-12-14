# Dashbuilder Components

Components for Dashbuilder. Components in `packages` dir.


### Requirements

* npm
* Yarn


### Building 

Run `yarn run init && yarn run build:prod` on root dir

### Development

To create a component copy `packages/hello-component` to a new folder inside packages and modify according to your components requirements. To run the component in development use `yarn run start` on the component base dir and then access `localhost:9001`. The content from `static/manifest.dev.json` will be used to build the component.
