# Strategies

Strategies work in an event-driven manner, taking in market data and event data and assessing the current state of order management. The parent `Strategy` class is subclassed into `SubStrategy`, which is where you implement your own strategy and ordering logic.

Strategies store all relevant data under `Strategy.state`, including market data (e.g., `Strategy.state.doms`, `Strategy.state.ticks`), and event data (e.g., `Strategy.state.positions`, `Strategy.state.fills`).

On new messages, the Strategy calls the `update()` and nested `alpha()` functions to estimate the state of current orders, whether or not we are asynchronously listening for a promise or order update, calculate signals, and determine the next action to take.

In your `SubStrategy`, you'll need to override the following functions to establish your signal and order management logic:

* `alpha()`
* `workingNoPos()`
* `workingNetPos()`
* `inactiveNoPos()`
* `inactiveNetPos()`
* `trimPosition()`