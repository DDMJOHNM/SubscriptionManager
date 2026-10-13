# User Service

![system design](../../documentation/userservice.png)

 Hexagonal Ports and Adapters Pattern for maintainability  

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

## Deployment

```
    manual step (tests must pass on the pipeline)
    serverless deploy
    CreateUserLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:051826704696:function:Users-dev-createUser:3
    ServiceEndpoint: https://1m65skl5z7.execute-api.us-east-1.amazonaws.com/dev
    ServerlessDeploymentBucketName: serverless-framework-deployments-us-east-1-e69b10d0-edb3
 
```

References:
https://miladezzat.medium.com/hexagonal-architecture-ports-and-adapters-pattern-5ad2421802ec