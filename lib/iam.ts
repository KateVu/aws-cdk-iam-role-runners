import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

interface IamRoleRunnersStackPros extends StackProps {
  region: string,
  accountId: string,
  accountName: string,
  envName: string,
  repo: string
}

export class IamRoleRunnersStack extends Stack {
  constructor(scope: Construct, id: string, props: IamRoleRunnersStackPros) {
    const { region, accountId, accountName } = props
    const updatedProps = {
        env: {
            region: region,
            account: accountId,
        },
        ...props
    }
    super(scope, id, updatedProps)    

    const githubOidcProvider = new iam.OpenIdConnectProvider(this, `GithubOidcProvider`, {
      url: 'https://token.actions.githubusercontent.com',
      thumbprints: ['1c58a3a8518e8759bf075b76b750d4f2df264fcd'],
      clientIds: ['sts.amazonaws.com'],
    })

    const githubActionsDeploymentRole = new iam.Role(this, `GithubActionsDeploymentUser`, {
      assumedBy: new iam.WebIdentityPrincipal(
        githubOidcProvider.openIdConnectProviderArn,
        {
          StringLike: { 
            'token.actions.githubusercontent.com:sub': `repo:${props.repo}`,
            'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
          },            
        },
      ),
      roleName: 'github-actions-deployment-role',
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'),
      ],      
    })
    
    new CfnOutput(this, `${this.stackName}-ec2`, {
      value: githubActionsDeploymentRole.roleName,
      exportName: `${this.stackName}-rolename`
  })

  }
}
