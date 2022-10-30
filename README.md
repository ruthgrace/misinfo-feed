## Running React on Repl.it

[React](https://reactjs.org/) is a popular JavaScript library for building user interfaces.

[Vite](https://vitejs.dev/) is a blazing fast frontend build tool that includes features like Hot Module Reloading (HMR), optimized builds, and TypeScript support out of the box.

Using the two in conjunction is one of the fastest ways to build a web app.

### Getting Started

#### Set up CORS anywhere

- Create a replit and click Import from GitHub. Select the CORS anywhere repo (https://github.com/Rob--W/cors-anywhere) to import, and hit Run.

#### Set up web dev environment
The code template used at first was the React Typescript one from Replit.
- Set `const corsProxy` to the URL of the CORS anywhere replit
- Install tailwind

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- Hit run
- Edit [App.tsx](#src/App.tsx) and watch it live update!

By default, Replit runs the `dev` script, but you can configure it by changing the `run` field in the [configuration file](#.replit). Here are the vite docs for [serving production websites](https://vitejs.dev/guide/build.html)