#!/bin/bash

STACK_COMMAND=$1
PROJECT_NAME="react-account-kit-web-graphql"
STACK_NAME="$PROJECT_NAME-stack"
CF_FILE="$PROJECT_NAME-cf"
ZIP_FILE_NAME="$PROJECT_NAME-lambda"
LAMBDA_CODE_S3_BUCKET_NAME=$2
AK_APP_ID=$3
AK_APP_SECRET=$4
AK_APP_VERSION=$6
CSRF=$6

npm install
rm -rf lib/
rm "$ZIP_FILE_NAME.zip"
npm run build
zip -q -r "$ZIP_FILE_NAME.zip" lambda.js package.json lib/* node_modules/*

TIMESTAMP=`date +%s`
aws s3 cp "$ZIP_FILE_NAME.zip" s3://$LAMBDA_CODE_S3_BUCKET_NAME/lambda/$ZIP_FILE_NAME-$TIMESTAMP.zip

# set random CSRF
if [ -z "$CSRF"]; then
  CSRF=`echo -n $TIMESTAMP | shasum -a 256 | cut -c1-32`
fi

# set default app version
if [ -z "$AK_APP_VERSION"]; then
  AK_APP_VERSION="v1.1"
fi

aws cloudformation $STACK_COMMAND-stack --stack-name "$STACK_NAME" \
  --template-body file://./aws/$CF_FILE.yml \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameters "ParameterKey=LambdaCodeS3ZipFileName,ParameterValue=$ZIP_FILE_NAME" \
  "ParameterKey=LambdaCodeS3KeyTimestamp,ParameterValue=$TIMESTAMP" \
  "ParameterKey=LambdaCodeS3BucketName,ParameterValue=$LAMBDA_CODE_S3_BUCKET_NAME" \
  "ParameterKey=AkAppId,ParameterValue=$AK_APP_ID" \
  "ParameterKey=AkAppSecret,ParameterValue=$AK_APP_SECRET" \
  "ParameterKey=AkAppVersion,ParameterValue=$AK_APP_VERSION" \
  "ParameterKey=CSRF,ParameterValue=$CSRF"

aws cloudformation wait stack-$STACK_COMMAND-complete --stack-name "$STACK_NAME"
aws cloudformation describe-stacks --stack-name "$STACK_NAME"
