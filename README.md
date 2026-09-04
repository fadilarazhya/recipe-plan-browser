# Recipe Browser

A recipe search & favorites app built with Expo Router, TypeScript, and Zustand — browse recipes from [TheMealDB](https://www.themealdb.com/api.php), search with debounce, view full recipe detail, and save favorites offline.

## Stack

- [Expo](https://expo.dev) (managed) + [Expo Router](https://docs.expo.dev/router/introduction/) (file-based navigation)
- TypeScript
- [Zustand](https://github.com/pmndrs/zustand) + `persist` middleware, backed by AsyncStorage
- Jest + [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [TheMealDB](https://www.themealdb.com/api.php) (free, no API key required)

## Features

- Tab navigation (Recipes / Favorites) with a stack route for recipe detail
- Search with debounce (doesn't hammer the API on every keystroke)
- Pull-to-refresh on the recipe list
- Ingredient list normalized from TheMealDB's flat `strIngredient1..20` fields
- Instructions parsed from TheMealDB's inconsistent free-text format (handles `STEP N` markers, numbered lists, and plain paragraphs, with a safe fallback)
- Favorites persisted locally — survive an app restart
- 13 tests covering data normalization, store logic, and component rendering

## Screenshots

<!-- Add a few screenshots here, e.g.: -->
<!-- ![Recipe list](./assets/screenshots/list.png) ![Recipe detail](./assets/screenshots/detail.png) ![Favorites](./assets/screenshots/favorites.png) -->

## Running it

```bash
npm install
npx expo start
```

Scan the QR code with [Expo Go](https://expo.dev/go) on your phone (Android or iOS), or press `a`/`i` in the terminal to open an emulator/simulator if you have one set up.

## Running tests

```bash
npm test
```

## Known limitations

- Only tested on a single physical Android device — not verified on iOS or a range of screen sizes/simulators.
- Instruction parsing is heuristic-based (regex), not a real parser — some free-text formats from the API still render as a single unsplit paragraph. This is a deliberate stopping point: a fully robust parser isn't worth the complexity for how inconsistent the source data is.
