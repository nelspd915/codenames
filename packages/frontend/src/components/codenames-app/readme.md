# codenames-app

<!-- Auto Generated Below -->


## Dependencies

### Depends on

- [codenames-landing-page](../codenames-landing-page)
- [codenames-game](../codenames-game)

### Graph
```mermaid
graph TD;
  codenames-app --> codenames-landing-page
  codenames-app --> codenames-game
  codenames-game --> codenames-panel
  codenames-game --> codenames-button
  codenames-game --> codenames-scores
  codenames-game --> codenames-board
  codenames-board --> codenames-cell
  codenames-cell --> codenames-spinner
  style codenames-app fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
