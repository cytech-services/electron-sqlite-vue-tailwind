# electron-sqlite-vue-tailwind

A simple template to get a new project started with Electron, SQLite, Vue 3 and Tailwind

## Technologies

-   Electron 16
-   Vue 3
-   Tailwind 3
-   SQLite

## Project setup

Copy the .env.example file to .env and edit the variables as necessary for your project

-   _NODE_STORAGE_PATH_ sets the base application storage path. This is a value from [app.getPath(name)](https://www.electronjs.org/docs/latest/api/app#appgetpathname)
-   _NODE_STORAGE_PATH_EXTRA_ is a relative path from _NODE_STORAGE_PATH_ but must start with "/" and end **without** a "/"
-   _NODE_STORAGE_PATH_DATABASE_EXTRA_ is a relative path from _NODE_STORAGE_PATH_EXTRA_ but must start with "/" and end **without** a "/"

**_Note:_** _Currently the default and recommended value for NODE_STORAGE is "userData". This is the default location that Electron will store its persistent data for the application. If you use a value other than the default than it is suggested you set a value for NODE_STORAGE_PATH_EXTRA so that your application is seperated from other user files. Setting NODE_STORAGE_PATH_DATABASE_EXTRA is optional if you wish to seperate the database file even further_

#### Example:

In a windows environment the below would generate the paths

-   NODE_STORAGE = C:\Users\ExampleUser\Documents
-   NODE_STORAGE_PATH_EXTRA = C:\Users\ExampleUser\Documents\Projects\Electron\electron-sqlite-vue-tailwind
-   NODE_STORAGE_PATH_DATABASE_EXTRA = C:\Users\ExampleUser\Documents\Projects\Electron\electron-sqlite-vue-tailwind\database

```
NODE_ENV=local
NODE_STORAGE_PATH=documents
NODE_STORAGE_PATH_EXTRA=/Projects/Electron/electron-sqlite-vue-tailwind
NODE_STORAGE_PATH_DATABASE_EXTRA=/database
```

### Install Node packages and dependencies

```
npm install
```

### Compiles and hot-reloads for development

```
npm run electron:serve
```

### Compiles and minifies for production

```
npm run electron:build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
