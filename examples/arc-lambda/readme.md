# architect/Lambda/DynamoDB TodoMVC Example

Event driven programming with cloud functions can be tricky to set up and maintain. architect offers a simple plaintext manifest and npm script based workflows for provisioning, deploying, orchestrating, and working offline with cloud infrastructure.

Using [architect](https://arc.codes), this example adds a persistent store via [DynamoDB](https://aws.amazon.com/dynamodb/) and all interaction with DynamoDB as well as the loading of all content is done via [AWS Lambda](https://aws.amazon.com/lambda/).

## Setup

0. To deploy, first set up a `[jsf]` profile in `~/.aws/credentials` with stubbed `aws_access_key_id`, `aws_secret_access_key`, and `region` env vars.
1. Initialize the repos by running `npm i && npm run init`.

## Local Instance

```
npm start
```

## Deploy

### Staging

```
npm run deploy
```

### Production

```
ARC_DEPLOY=production npm run deploy
```
