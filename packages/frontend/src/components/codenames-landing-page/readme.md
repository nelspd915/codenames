# codenames-landing-page



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description                      | Type      | Default     |
| ------------------- | --------------------- | -------------------------------- | --------- | ----------- |
| `roomCode`          | `room-code`           | Room code currently entered.     | `string`  | `""`        |
| `server`            | --                    | Library of server utilities.     | `Server`  | `undefined` |
| `socketIsConnected` | `socket-is-connected` | Whether the socket is connected. | `boolean` | `false`     |
| `username`          | `username`            | Username currently entered.      | `string`  | `""`        |


## Dependencies

### Used by

 - [codenames-app](../codenames-app)

### Depends on

- [codenames-button](../codenames-button)

### Graph
```mermaid
graph TD;
  codenames-landing-page --> codenames-button
  codenames-app --> codenames-landing-page
  style codenames-landing-page fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
