# User Service

![system design](../../documentation/userservice.png)

Domain Logic (Core): At the heart of the hexagon is the domain logic, representing the pure business rules of the application.
Ports: These are abstractions or interfaces that define how the external systems should communicate with the core logic.
Adapters: Adapters are implementations of ports. They handle the actual communication between the external systems (e.g., databases, web APIs) and the business logic.
This architecture decouples the core domain from any particular technology, allowing for flexibility when switching or upgrading external components. The business logic remains untouched, regardless of changes in external systems.

- Fast Cold Starts
- Easy Mocking & Testing
- Separation of Concerns

## Endpoint Tests 

```
curl --request POST \
  'https://1m65skl5z7.execute-api.us-east-1.amazonaws.com/dev/domain/users/create' \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "user-1",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "secret"
  }'
  
serverless users logs -f createUser

```

References:
https://miladezzat.medium.com/hexagonal-architecture-ports-and-adapters-pattern-5ad2421802ec