import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';

export class FunctionUrlDistribution extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // 1. Lambda Function
    const cdkIssue35872Function = new lambda.Function(this, 'cdkIssue35872Function', {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline('exports.handler = async () => ({ statusCode: 200, body: "Hello" });'),
    });

    // 2. Lambda Function URL with IAM Auth
    const functionUrl = cdkIssue35872Function.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.AWS_IAM,
    });

    // 3. CloudFront Distribution using FunctionUrlOrigin with OAC
    new cloudfront.Distribution(this, 'cdkIssue35872FunctionUrlDistribution', {
      defaultBehavior: {
        origin: origins.FunctionUrlOrigin.withOriginAccessControl(functionUrl),
      },
    });
  }
}
