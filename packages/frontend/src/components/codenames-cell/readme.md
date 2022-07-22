# my-component



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                   | Type                                                   | Default       |
| ---------- | ---------- | ----------------------------- | ------------------------------------------------------ | ------------- |
| `color`    | `color`    | Cell color.                   | `Color.Black \| Color.Blue \| Color.Gray \| Color.Red` | `Color.Gray`  |
| `index`    | `index`    | Index of the cell.            | `number`                                               | `undefined`   |
| `mode`     | `mode`     | Cell display mode.            | `Mode.Endgame \| Mode.Normal \| Mode.Spymaster`        | `Mode.Normal` |
| `revealed` | `revealed` | Whether the cell is revealed. | `boolean`                                              | `false`       |
| `word`     | `word`     | Word shown in cell.           | `string`                                               | `""`          |


## Events

| Event        | Description                                    | Type                  |
| ------------ | ---------------------------------------------- | --------------------- |
| `revealCell` | Event fired upon clicking a cell to reveal it. | `CustomEvent<number>` |


## Dependencies

### Used by

 - [codenames-board](../codenames-board)

### Depends on

- [codenames-spinner](../codenames-spinner)

### Graph
```mermaid
graph TD;
  codenames-cell --> codenames-spinner
  codenames-board --> codenames-cell
  style codenames-cell fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
