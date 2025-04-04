==MCP is an open protocol that standardizes how applications provide context to LLMs==. Think of MCP like a USB-C port for AI applications. Just as USB-C provides a standardized way to connect your devices to various peripherals and accessories, MCP provides a standardized way to connect AI models to different data sources and tools.

## General architecture

At its core, MCP follows a client-server architecture where a host application can connect to multiple servers:

![[Pasted image 20250404182447.png]]

- **MCP Hosts**: Programs like Claude Desktop, IDEs, or AI tools that want to access data through MCP
- **MCP Clients**: Protocol clients that maintain 1:1 connections with servers
- **MCP Servers**: Lightweight programs that each expose specific capabilities through the standardized Model Context Protocol
- **Local Data Sources**: Your computer’s files, databases, and services that MCP servers can securely access
- **Remote Services**: External systems available over the internet (e.g., through APIs) that MCP servers can connect to

## Core architecture

The Model Context Protocol (MCP) is built on a flexible, extensible architecture that enables seamless communication between LLM applications and integrations.

MCP follows a client-server architecture where:

- **Hosts** are LLM applications (like Claude Desktop or IDEs) that initiate connections
- **Clients** maintain 1:1 connections with servers, inside the host application
- **Servers** provide context, tools, and prompts to clients

![[Pasted image 20250404182827.png]]

### Protocol layer

The protocol layer handles message framing, request/response linking, and high-level communication patterns.

```typescript
class Protocol<Request, Notification, Result> {
    // Handle incoming requests
    setRequestHandler<T>(
        schema: T,
        handler: (request: T, extra: RequestHandlerExtra) => Promise<Result>,
    ): void

    // Handle incoming notifications
    setNotificationHandler<T>(schema: T, handler: (notification: T) => Promise<void>): void

    // Send requests and await responses
    request<T>(request: Request, schema: T, options?: RequestOptions): Promise<T>

    // Send one-way notifications
    notification(notification: Notification): Promise<void>
}
```

### Transport layer

The transport layer handles the actual communication between clients and servers. MCP supports multiple transport mechanisms:

1. **Stdio transport**

    - Uses standard input/output for communication
    - Ideal for local processes

2. **HTTP with SSE transport**
    - Uses Server-Sent Events for server-to-client messages
    - HTTP POST for client-to-server messages

All transports use [JSON-RPC](https://www.jsonrpc.org/) 2.0 to exchange messages. See the [specification](https://spec.modelcontextprotocol.io) for detailed information about the Model Context Protocol message format.

### Message types

MCP has these main types of messages:

- **Requests** expect a response from the other side:
    ```typescript
    interface Request {
      method: string;
      params?: { ... };
    }
    ```
- **Results** are successful responses to requests:
    ```typescript
    interface Result {
        [key: string]: unknown
    }
    ```
- **Errors** indicate that a request failed:
    ```typescript
    interface Error {
        code: number
        message: string
        data?: unknown
    }
    ```
- **Notifications** are one-way messages that don’t expect a response:
    ```typescript
    interface Notification {
      method: string;
      params?: { ... };
    }
    ```

### Connection lifecycle

![[Pasted image 20250404183910.png]]

1. Client sends `initialize` request with protocol version and capabilities
2. Server responds with its protocol version and capabilities
3. Client sends `initialized` notification as acknowledgment
4. Normal message exchange begins