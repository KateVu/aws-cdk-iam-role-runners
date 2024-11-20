# aws-cdk-iam-role-runners
This module deploys a 3-tier VPC. The following resources are managed:
- OpenIdConnectProvider
- IAM Role for GitHub Actions to assume
## Getting started
### Update mapping for account name and aws account id:
- If there is no aws_account.yaml file in config folder, create new one, example can be found in aws_account-template.yaml file.
Add a file name aws_account.yaml in config folder and add your account name and id
```
- name: sandpit1
  account_id: 'your aws account id - please leave the quote here so we do not face type error'
```   
- Add a file name repo.yaml in config folder and add your repo
```
- repo: your_repo/*
```   
### How to deploy
- Obtain aws credential for the aws account (check ~/.aws/credential or ~/.aws/cli/cache)
- export your environment variable if you do not want to use the default one. This variable is used in bin/index.ts
- synth: cdk synth
- deploy: cdk deploy
- destroy: cdk destroy

https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services