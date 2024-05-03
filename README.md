# mod-aws-cdk-oidc-iamrole

[![CDK](https://img.shields.io/badge/CDK-2.138.0-yellow)](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html)

> Module that allows the creation of OIDC IAM Role and its dependencies.
>
> ## Table of Contents

- [mod-aws-cdk-oidc-iamrole](#mod-aws-cdk-oidc-iamrole)
  - [Table of Contents](#Table-of-Contents)
  - [Diagram](#Diagram)
  - [Prerequisites](#Prerequisites)
  - [Providers](#Providers)
  - [Inputs](#Inputs)
  - [Outputs](#Outputs)
  - [Example usage](#Example-usage)
  - [Basic Invocation Example](#Basic-Invocation-Example)

## Diagram

![](./images/IAM%20Roles.png)

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](http://git-scm.com/)
- [Node](https://nodejs.org/en/download)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [CDK](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html#getting_started_install)
- [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)

## Requirements

![NPM](https://img.shields.io/badge/NPM%20INSTALL-grey?style=for-the-badge&logo=NPM)



## Providers

| Name | Version |
| ---- | ------- |
| ![AWS](https://img.shields.io/badge/AWS-gree)  | ![N/A](https://img.shields.io/badge/N/A-grey)     |

## Inputs

| Name                  | Description                                                                                                                        | Type     | Default | Required |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | :------: |
| roleName                 | Custom Role Name.                                                                                                            | `string`    | n/a     |   yes    |
| description                  | Custom Description to Role.                                                                                                       | `string`    | n/a     |   yes    |
| policyName    | Custom Policy Name.                                                                    | `string` | n/a   |    yes    |
| actions           | Allowable Action to Role                                                                                                           | `string[]` | n/a    |    yes    |
| resources | Resource Allowed Access.                                                       | `string[]` | n/a |    yes    |


## Outputs

| Name  | Description                                 |
| ----- | ------------------------------------------- |
| ![N/A](https://img.shields.io/badge/N/A-grey) | ![N/A](https://img.shields.io/badge/N/A-grey) |

## Example usage

- This module creates an OIDC Provider, a Role that takes the OIDC as a Trust Entity Configuration, a policy to allow actions on resources and finally attaches the policy to the role.


### Basic Invocation Example

```CDK
Add in package.json

"dependencies": {
    "aws-cdk-lib": "2.138.0",
    "OIDCModule": "gitlab:mauriciogonzalezferia/mod-aws-cdk-oidc-iamrole"
  }

#################################################################

const cdk = require('aws-cdk-lib');
const iam = require('aws-cdk-lib/aws-iam');
const { OIDCModule } = require('OIDCModule/oidc-role-module');

class CdkRoleStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Create Role
    new OIDCModule(this, 'OIDCModule', {
      roleName: 'Test-Role',
      description: 'Test Role by Module',
      policyName: 'Policy-Test-Role',
      actions: ['sts:AssumeRole', 's3:*'],
      resources: ['*']
    });
  }
}

module.exports = { CdkRoleStack };

```

