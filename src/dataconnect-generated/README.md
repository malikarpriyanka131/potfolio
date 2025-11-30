# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `Angular README`, you can find it at [`dataconnect-generated/angular/README.md`](./angular/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetPublicPortfolios*](#getpublicportfolios)
  - [*ListSkillsForUser*](#listskillsforuser)
- [**Mutations**](#mutations)
  - [*CreateNewMessage*](#createnewmessage)
  - [*UpdateProjectDescription*](#updateprojectdescription)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetPublicPortfolios
You can execute the `GetPublicPortfolios` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getPublicPortfolios(): QueryPromise<GetPublicPortfoliosData, undefined>;

interface GetPublicPortfoliosRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetPublicPortfoliosData, undefined>;
}
export const getPublicPortfoliosRef: GetPublicPortfoliosRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPublicPortfolios(dc: DataConnect): QueryPromise<GetPublicPortfoliosData, undefined>;

interface GetPublicPortfoliosRef {
  ...
  (dc: DataConnect): QueryRef<GetPublicPortfoliosData, undefined>;
}
export const getPublicPortfoliosRef: GetPublicPortfoliosRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPublicPortfoliosRef:
```typescript
const name = getPublicPortfoliosRef.operationName;
console.log(name);
```

### Variables
The `GetPublicPortfolios` query has no variables.
### Return Type
Recall that executing the `GetPublicPortfolios` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPublicPortfoliosData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetPublicPortfoliosData {
  portfolios: ({
    id: UUIDString;
    title: string;
    description?: string | null;
    headerImage?: string | null;
  } & Portfolio_Key)[];
}
```
### Using `GetPublicPortfolios`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPublicPortfolios } from '@dataconnect/generated';


// Call the `getPublicPortfolios()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPublicPortfolios();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPublicPortfolios(dataConnect);

console.log(data.portfolios);

// Or, you can use the `Promise` API.
getPublicPortfolios().then((response) => {
  const data = response.data;
  console.log(data.portfolios);
});
```

### Using `GetPublicPortfolios`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPublicPortfoliosRef } from '@dataconnect/generated';


// Call the `getPublicPortfoliosRef()` function to get a reference to the query.
const ref = getPublicPortfoliosRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPublicPortfoliosRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.portfolios);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.portfolios);
});
```

## ListSkillsForUser
You can execute the `ListSkillsForUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listSkillsForUser(vars: ListSkillsForUserVariables): QueryPromise<ListSkillsForUserData, ListSkillsForUserVariables>;

interface ListSkillsForUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListSkillsForUserVariables): QueryRef<ListSkillsForUserData, ListSkillsForUserVariables>;
}
export const listSkillsForUserRef: ListSkillsForUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listSkillsForUser(dc: DataConnect, vars: ListSkillsForUserVariables): QueryPromise<ListSkillsForUserData, ListSkillsForUserVariables>;

interface ListSkillsForUserRef {
  ...
  (dc: DataConnect, vars: ListSkillsForUserVariables): QueryRef<ListSkillsForUserData, ListSkillsForUserVariables>;
}
export const listSkillsForUserRef: ListSkillsForUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listSkillsForUserRef:
```typescript
const name = listSkillsForUserRef.operationName;
console.log(name);
```

### Variables
The `ListSkillsForUser` query requires an argument of type `ListSkillsForUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListSkillsForUserVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `ListSkillsForUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListSkillsForUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListSkillsForUserData {
  skills: ({
    id: UUIDString;
    name: string;
    level?: string | null;
  } & Skill_Key)[];
}
```
### Using `ListSkillsForUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listSkillsForUser, ListSkillsForUserVariables } from '@dataconnect/generated';

// The `ListSkillsForUser` query requires an argument of type `ListSkillsForUserVariables`:
const listSkillsForUserVars: ListSkillsForUserVariables = {
  userId: ..., 
};

// Call the `listSkillsForUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listSkillsForUser(listSkillsForUserVars);
// Variables can be defined inline as well.
const { data } = await listSkillsForUser({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listSkillsForUser(dataConnect, listSkillsForUserVars);

console.log(data.skills);

// Or, you can use the `Promise` API.
listSkillsForUser(listSkillsForUserVars).then((response) => {
  const data = response.data;
  console.log(data.skills);
});
```

### Using `ListSkillsForUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listSkillsForUserRef, ListSkillsForUserVariables } from '@dataconnect/generated';

// The `ListSkillsForUser` query requires an argument of type `ListSkillsForUserVariables`:
const listSkillsForUserVars: ListSkillsForUserVariables = {
  userId: ..., 
};

// Call the `listSkillsForUserRef()` function to get a reference to the query.
const ref = listSkillsForUserRef(listSkillsForUserVars);
// Variables can be defined inline as well.
const ref = listSkillsForUserRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listSkillsForUserRef(dataConnect, listSkillsForUserVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.skills);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.skills);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateNewMessage
You can execute the `CreateNewMessage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createNewMessage(vars: CreateNewMessageVariables): MutationPromise<CreateNewMessageData, CreateNewMessageVariables>;

interface CreateNewMessageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewMessageVariables): MutationRef<CreateNewMessageData, CreateNewMessageVariables>;
}
export const createNewMessageRef: CreateNewMessageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createNewMessage(dc: DataConnect, vars: CreateNewMessageVariables): MutationPromise<CreateNewMessageData, CreateNewMessageVariables>;

interface CreateNewMessageRef {
  ...
  (dc: DataConnect, vars: CreateNewMessageVariables): MutationRef<CreateNewMessageData, CreateNewMessageVariables>;
}
export const createNewMessageRef: CreateNewMessageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createNewMessageRef:
```typescript
const name = createNewMessageRef.operationName;
console.log(name);
```

### Variables
The `CreateNewMessage` mutation requires an argument of type `CreateNewMessageVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateNewMessageVariables {
  portfolioId: UUIDString;
  messageContent: string;
  senderEmail: string;
  senderName: string;
  subject: string;
}
```
### Return Type
Recall that executing the `CreateNewMessage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateNewMessageData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateNewMessageData {
  message_insert: Message_Key;
}
```
### Using `CreateNewMessage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createNewMessage, CreateNewMessageVariables } from '@dataconnect/generated';

// The `CreateNewMessage` mutation requires an argument of type `CreateNewMessageVariables`:
const createNewMessageVars: CreateNewMessageVariables = {
  portfolioId: ..., 
  messageContent: ..., 
  senderEmail: ..., 
  senderName: ..., 
  subject: ..., 
};

// Call the `createNewMessage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createNewMessage(createNewMessageVars);
// Variables can be defined inline as well.
const { data } = await createNewMessage({ portfolioId: ..., messageContent: ..., senderEmail: ..., senderName: ..., subject: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createNewMessage(dataConnect, createNewMessageVars);

console.log(data.message_insert);

// Or, you can use the `Promise` API.
createNewMessage(createNewMessageVars).then((response) => {
  const data = response.data;
  console.log(data.message_insert);
});
```

### Using `CreateNewMessage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createNewMessageRef, CreateNewMessageVariables } from '@dataconnect/generated';

// The `CreateNewMessage` mutation requires an argument of type `CreateNewMessageVariables`:
const createNewMessageVars: CreateNewMessageVariables = {
  portfolioId: ..., 
  messageContent: ..., 
  senderEmail: ..., 
  senderName: ..., 
  subject: ..., 
};

// Call the `createNewMessageRef()` function to get a reference to the mutation.
const ref = createNewMessageRef(createNewMessageVars);
// Variables can be defined inline as well.
const ref = createNewMessageRef({ portfolioId: ..., messageContent: ..., senderEmail: ..., senderName: ..., subject: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createNewMessageRef(dataConnect, createNewMessageVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.message_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.message_insert);
});
```

## UpdateProjectDescription
You can execute the `UpdateProjectDescription` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateProjectDescription(vars: UpdateProjectDescriptionVariables): MutationPromise<UpdateProjectDescriptionData, UpdateProjectDescriptionVariables>;

interface UpdateProjectDescriptionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectDescriptionVariables): MutationRef<UpdateProjectDescriptionData, UpdateProjectDescriptionVariables>;
}
export const updateProjectDescriptionRef: UpdateProjectDescriptionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProjectDescription(dc: DataConnect, vars: UpdateProjectDescriptionVariables): MutationPromise<UpdateProjectDescriptionData, UpdateProjectDescriptionVariables>;

interface UpdateProjectDescriptionRef {
  ...
  (dc: DataConnect, vars: UpdateProjectDescriptionVariables): MutationRef<UpdateProjectDescriptionData, UpdateProjectDescriptionVariables>;
}
export const updateProjectDescriptionRef: UpdateProjectDescriptionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProjectDescriptionRef:
```typescript
const name = updateProjectDescriptionRef.operationName;
console.log(name);
```

### Variables
The `UpdateProjectDescription` mutation requires an argument of type `UpdateProjectDescriptionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateProjectDescriptionVariables {
  id: UUIDString;
  description?: string | null;
}
```
### Return Type
Recall that executing the `UpdateProjectDescription` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProjectDescriptionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProjectDescriptionData {
  project_update?: Project_Key | null;
}
```
### Using `UpdateProjectDescription`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProjectDescription, UpdateProjectDescriptionVariables } from '@dataconnect/generated';

// The `UpdateProjectDescription` mutation requires an argument of type `UpdateProjectDescriptionVariables`:
const updateProjectDescriptionVars: UpdateProjectDescriptionVariables = {
  id: ..., 
  description: ..., // optional
};

// Call the `updateProjectDescription()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProjectDescription(updateProjectDescriptionVars);
// Variables can be defined inline as well.
const { data } = await updateProjectDescription({ id: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProjectDescription(dataConnect, updateProjectDescriptionVars);

console.log(data.project_update);

// Or, you can use the `Promise` API.
updateProjectDescription(updateProjectDescriptionVars).then((response) => {
  const data = response.data;
  console.log(data.project_update);
});
```

### Using `UpdateProjectDescription`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProjectDescriptionRef, UpdateProjectDescriptionVariables } from '@dataconnect/generated';

// The `UpdateProjectDescription` mutation requires an argument of type `UpdateProjectDescriptionVariables`:
const updateProjectDescriptionVars: UpdateProjectDescriptionVariables = {
  id: ..., 
  description: ..., // optional
};

// Call the `updateProjectDescriptionRef()` function to get a reference to the mutation.
const ref = updateProjectDescriptionRef(updateProjectDescriptionVars);
// Variables can be defined inline as well.
const ref = updateProjectDescriptionRef({ id: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProjectDescriptionRef(dataConnect, updateProjectDescriptionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_update);
});
```

