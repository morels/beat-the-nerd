# Beat the nerd

This project consists in an interaction with an open API endpoint. The appearance is like a simple messaging app, where at the opposite edge there is a mocket personality (the nerd) that answers your questions, expected to be all math expressions. 

The UX is enhanced with some gamification where the user is pretended to try beating a nerd able to solve any matematical equation.

The API is provided by Newton API (https://github.com/aunyks/newton-api).

The math-processing endpoint is Simplify (https://github.com/aunyks/newton-api#view-available-endpoints).

Theme used is NES.css (https://nostalgic-css.github.io/NES.css/) with some inline css in js rules.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Notes for usage
The endpoint does not return error in any case:
* for mathematical operation errors (i.e. divide by zero) it returns a string
* for any string it returns an identity string if it is not solvable

The endpoint is not protected against huge operations, so if you ask for example 99999^99999 it crashes badly (504: GATEWAY_TIMEOUT).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
