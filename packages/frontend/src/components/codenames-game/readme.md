# codenames-game

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute | Description                                            | Type         | Default     |
| ------------ | --------- | ------------------------------------------------------ | ------------ | ----------- |
| `gameData`   | --        | Game data used to populate values on the board and UI. | `GameData`   | `undefined` |
| `server`     | --        | Library of server utilities.                           | `Server`     | `undefined` |
| `userPlayer` | --        | Player data for the user.                              | `PlayerData` | `undefined` |


## Dependencies

### Used by

 - [codenames-app](../codenames-app)

### Depends on

- [codenames-panel](../codenames-panel)
- [codenames-button](../codenames-button)
- [codenames-scores](../codenames-scores)
- [codenames-board](../codenames-board)

### Graph
```mermaid
graph TD;
  codenames-game --> codenames-panel
  codenames-game --> codenames-button
  codenames-game --> codenames-scores
  codenames-game --> codenames-board
  codenames-board --> codenames-cell
  codenames-cell --> codenames-spinner
  codenames-app --> codenames-game
  style codenames-game fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
