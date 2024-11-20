#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { IamRoleRunnersStack } from '../lib/iam';
import { getAccountId, getRepo } from '../lib/utils';

//Environment variable for yaml file path and file name
const configFolder = '../config/'
const accountFileName = 'aws_account.yaml'
const repoFileName = 'repo.yaml'

//Set up default value
const envName = process.env.ENVIRONMENT_NAME || 'kate'
const accountName = process.env.ACCOUNT_NAME || 'sandpit1'
const region = process.env.REGION || 'ap-southeast-2'

//Get aws account id
const accountId = getAccountId(accountName, configFolder, accountFileName)
//Get repo
const repo = getRepo(configFolder, repoFileName)

const app = new cdk.App();

const iamStack = new IamRoleRunnersStack(app, 'IamRoleRunnersStack', {
  stackName: `iam-role-runners-${envName}`,
  region: region,
  accountId: accountId,
  accountName: accountName,
  envName: envName,
  repo: repo
})

cdk.Tags.of(iamStack).add('createdby', 'KateVu')
cdk.Tags.of(iamStack).add('createdvia', 'AWS-CDK')
cdk.Tags.of(iamStack).add('environment', envName)
cdk.Tags.of(iamStack).add('repo', 'https://github.com/KateVu/aws-cdk-iam-role-runners')