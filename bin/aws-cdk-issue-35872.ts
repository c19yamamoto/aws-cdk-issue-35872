#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { FunctionUrlDistribution } from '../lib/functionurl-distribution-stack';

const app = new cdk.App();
new FunctionUrlDistribution(app, 'FunctionUrlDistributionStack');
