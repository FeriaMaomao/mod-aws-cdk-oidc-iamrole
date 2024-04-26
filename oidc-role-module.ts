import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';

// Parameter to IAM Role
interface OIDCModuleProps {
  roleName: string;
  description: string;
  policyName: string;
  actions: string[];
  resources: string[];
}

export class OIDCModule extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: OIDCModuleProps) {
    super(scope, id);

    // Create an OIDC Identity Provider
    const oidcProvider = new iam.OpenIdConnectProvider(this, 'OIDCProvider', {
      url: 'https://gitlab.com', // Provider URL, Specify the secure OpenID Connect URL for authentication requests.
      clientIds: ['https://gitlab.com'] // Audience, Specify the client ID issued by the Identity provider for your app.
    });

    // Create Role with OIDC
    const role = new iam.Role(this, 'MyRole', {
      roleName: props.roleName, // Custom Role Name
      description: props.description, // Custom Description to Role
      assumedBy: new iam.FederatedPrincipal(oidcProvider.openIdConnectProviderArn, {
        StringEquals: { 'gitlab.com:aud': 'https://gitlab.com' } // Allow only GitLab.com to take on this role
      }, 'sts:AssumeRoleWithWebIdentity')
    });

    // Create Policy
    const policy = new iam.Policy(this, 'MyInvokePolicy', {
      policyName: props.policyName, // Custom Policy Name
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: props.actions, // Allowable Action
          resources: props.resources // Resource Allowed Access
        })
      ]
    });

    // Attaching the Policy to the OIDC Role
    role.attachInlinePolicy(policy);
  }
}
