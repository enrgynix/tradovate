# Sockets

Defines a `connect()`, `disconnect()`, and `request()` function which enables it to simply interrogate the Tradovate WebSocket API.

Further, implements API endpoints under their respective families, accessible as:

```
let exampleSocket = new TradovateSocket();

let apiRequest = exampleSocket.parent.endpoint({
	query: {
		...
	},
	body: {
		...
	}
})

// Example
let placeOrderRequest = exampleSocket.order.placeOrder({
	body: {
		...
	}
})
```

Note, additional fields can be defined on the socket, but it is highly recommended to ensure they do not overwrite the `parent` fields (e.g., `order`, `fillPair`, `md`, etc.)