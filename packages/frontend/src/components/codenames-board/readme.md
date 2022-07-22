# codenames-board



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute | Description                            | Type         | Default     |
| ----------- | --------- | -------------------------------------- | ------------ | ----------- |
| `boardData` | --        | Board data used to generate the cells. | `CellData[]` | `undefined` |


## Dependencies

### Used by

 - [codenames-app](../codenames-app)

### Depends on

- [codenames-cell](../codenames-cell)

### Graph
```mermaid
graph TD;
  codenames-board --> codenames-cell
  codenames-cell --> codenames-spinner
  codenames-app --> codenames-board
  style codenames-board fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
