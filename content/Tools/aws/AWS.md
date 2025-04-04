## Cloud Watch

[@prometheus/cloudwatch_exporter](https://github.com/prometheus/cloudwatch_exporter)

[@nerdswords/yet-another-cloudwatch-exporter](https://github.com/nerdswords/yet-another-cloudwatch-exporter)

## Systems Manager

AWS Systems Manager Agent (SSM Agent) is Amazon software that runs on Amazon Elastic Compute Cloud (Amazon EC2) instances, edge devices, on-premises servers, and virtual machines (VMs). SSM Agent makes it possible for Systems Manager to update, manage, and configure these resources.

## Lambda

<https://github.com/awslabs/llrt>

## Identity and Access Management (IAM)

This service provides authentication and authorization for the AWS API.
IAM controls who (authentication) can do what (authorization) in your AWS account.
The various components of IAM follow:

- An IAM user is used to authenticate people or workloads running outside of AWS.
- An IAM group is a collection of IAM users with the same permissions.
- An IAM role is used to authenticate AWS resources, for example, an EC2 instance.
- An IAM identity policy is used to define the permissions for a user, group, or role.

|                                                                        | AWS account root user | IAM user | IAM role |
| :--------------------------------------------------------------------- | :-------------------: | :------: | :------: |
| Can have a password (needed to log in to the AWS Management Console)   |        Always         |   Yes    |    No    |
| Can have access keys (needed to send requests to the AWS API)          | Yes (not recommended) |   Yes    |    No    |
| Can belong to a group                                                  |          No           |   Yes    |    No    |
| Can be associated with an EC2 instance, ECS container, Lambda function |          No           |    No    |   Yes    |

### Defining permissions with an IAM identity policy

By attaching one or multiple IAM identity policies to an IAM user or role,
you are granting permissions to manage AWS resources.
Identity policies are defined in JSON and contain one or more statements.
A statement can either allow or deny specific actions on specific resources.
You can use the wildcard character `*` to create more generic statements.

:::note
IAM policies come in two types. Identity policies are attached to users,
groups, or roles.
Resource policies are attached to resources. Very few resource types support
resource policies. One common example is the **S3 bucket policy** attached
to **S3 buckets**.

If the policy contains the property _Principal_, it is a resource policy.
The _Principal_ defines who is allowed to perform the action. Keep in mind
that the principal can be set to public.
:::

## ARN (Amazon Resource Names)

Amazon Resource Names (ARNs) uniquely identify AWS resources.
We require an ARN when you need to specify a resource unambiguously across
all of AWS, such as in IAM policies,
Amazon Relational Database Service (Amazon RDS) tags, and API calls.

The following are the general formats for ARNs.
The specific formats depend on the resource.
Be aware that the ARNs for some resources omit the Region,
the account ID, or both the Region and the account ID.

```
arn:partition:service:region:account-id:resource-id
arn:partition:service:region:account-id:resource-type/resource-id
arn:partition:service:region:account-id:resource-type:resource-id
```

### `partition`

The partition in which the resource is located.
A partition is a group of AWS Regions.
Each AWS account is scoped to one partition.

The following are the supported partitions:

```
aws - AWS Regions
aws-cn - China Regions
aws-us-gov - AWS GovCloud (US) Regions
```

### `service`

The service namespace that identifies the AWS product.

### `region`

The Region code.
For example, `us-east-2` for US East (Ohio).
For the list of Region codes,
see [Regional endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints)
in the AWS General Reference.

### `account-id`

The ID of the AWS account that owns the resource,
without the hyphens.
For example, `123456789012`.
Account ID always has 12 digits.

### `resource-type`

The resource type. For example, `vpc` for a virtual private cloud (VPC).

### `resource-id`

The resource identifier.
This is the name of the resource, the ID of the resource, or a resource path.
Some resource identifiers include a parent resource
(`sub-resource-type/parent-resource/sub-resource`)
or a qualifier such as a version (`resource-type:resource-name:qualifier`).

### Examples

- IAM user: `arn:aws:iam::123456789012:user/johndoe`
- SNS topic `arn:aws:sns:us-east-1:123456789012:example-sns-topic-name`
- VPC `arn:aws:ec2:us-east-1:123456789012:vpc/vpc-0e9801d129EXAMPLE`
- EC2 `arn:aws:ec2:us-east-1:878533158213:instance/i-3dd4f812`

## S3 (Simple Storage Service)

### Server access logging

Server access logging provides detailed records for the requests that are made to an Amazon S3 bucket which
are useful for many applications.
For example, access log information can be useful in security and access audits.

By default, Amazon S3 doesn't collect server access logs. When you enable logging, Amazon S3 delivers access logs for a source bucket to a destination bucket (also known as a *target bucket*) that you choose. The destination bucket must be in the same AWS Region and AWS account as the source bucket.

An access log record contains details about the requests that are made to a bucket. This information can include the request type, the resources that are specified in the request, and the time and date that the request was processed.

## VPC (Virtual Private Cloud)

With Amazon Virtual Private Cloud (Amazon VPC), you can launch AWS resources in a logically isolated virtual network that you've defined. This virtual network closely resembles a traditional network that you'd operate in your own data center, with the benefits of using the scalable infrastructure of AWS.

The following diagram shows an example VPC. The VPC has one subnet in each of the Availability Zones in the Region, EC2 instances in each subnet, and an internet gateway to allow communication between the resources in your VPC and the internet.

![Untitled](Untitled.png)

The following features help you configure a VPC to provide the connectivity that your applications need:

- **Virtual private clouds (VPC)** A [VPC](https://docs.aws.amazon.com/vpc/latest/userguide/configure-your-vpc.html) is a virtual network that closely
  resembles a traditional network that you'd operate in your own data center. After you create a VPC, you can add subnets.
- **Subnets** A [subnet](https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html) is a range of IP addresses in your VPC.
  A subnet must reside in a single Availability Zone. After you add subnets, you can deploy AWS resources in your VPC.
- **IP addressing** You can assign [IP addresses](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-ip-addressing.html),
  both IPv4 and IPv6, to your VPCs and subnets. You can also bring your public IPv4 addresses and IPv6 GUA addresses to AWS and allocate
  them to resources in your VPC, such as EC2 instances, NAT gateways, and Network Load Balancers.
- **Routing** Use [route tables](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html) to determine where network traffic
  from your subnet or gateway is directed.
- **Gateways and endpoints** A [gateway](https://docs.aws.amazon.com/vpc/latest/userguide/extend-intro.html) connects your VPC to another network.
  For example, use an [internet gateway](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html) to connect your VPC to the internet.
  Use a [VPC endpoint](https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-access-aws-services.html) to connect to AWS services privately,
  without the use of an internet gateway or NAT device.
- **Peering connections** Use a [VPC peering connection](https://docs.aws.amazon.com/vpc/latest/peering/) to route traffic between
  the resources in two VPCs.
- **Traffic Mirroring** [Copy network traffic](https://docs.aws.amazon.com/vpc/latest/mirroring/) from network interfaces and send it to security and
  monitoring appliances for deep packet inspection.
- **Transit gateways** Use a [transit gateway](https://docs.aws.amazon.com/vpc/latest/userguide/extend-tgw.html),
  which acts as a central hub, to route traffic between your VPCs, VPN connections, and AWS Direct Connect connections.
- **VPC Flow Logs** A [flow log](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html) captures information about the IP traffic going
  to and from network interfaces in your VPC.
- **VPN connections** Connect your VPCs to your on-premises networks using
  [AWS Virtual Private Network (AWS VPN)](https://docs.aws.amazon.com/vpc/latest/userguide/vpn-connections.html).

### Control traffic to subnets using network ACLs

A _network access control list (ACL)_ allows or denies specific inbound or outbound traffic at the subnet level. You can use the default network ACL for
your VPC, or you can create a custom network ACL for your VPC with rules that are similar to the rules for your security groups in
order to add another layer of security to your VPC.

## EC2 (Elastic Compute Cluster)

Amazon EC2 provides a wide selection of instance types optimized to fit different use cases. Instance types comprise varying combinations of CPU, memory, storage, and networking capacity and give you the flexibility to choose the appropriate mix of resources for your applications. Each instance type includes one or more instance sizes, allowing you to scale your resources to the requirements of your target workload.

[Compute - Amazon EC2 Instance Types - AWS](https://aws.amazon.com/ec2/instance-types/)

## CLI

AWS CLI is not great, so you will need to use its **autocomplete** feature.

## ECS

### Introduction

Elastic Container Service (ECS) from Amazon Web Services (AWS) provides a way to lunch your services as a container on EC2 (Elastic Compute Cloud) instances.

### Cluster

First, you need to create a cluster and then add your EC2 instances into it. These instances will be called _container instances_.

```bash
aws ecs list-clusters
aws ecs list-container-instances --cluster ci001
```

### Tasks

A task means a collection of docker containers, and each task must have a family and revision. On each update, AWS will increase revision.

### Services

You can also run tasks as services. The ECS service scheduler ensures that the specified number of tasks are constantly running and reschedules tasks when a task fails (for example, if the underlying container instance fails for some reason).

### References

[Creating a cluster with an EC2 task using the AWS CLI - Amazon Elastic Container Service](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_AWSCLI_EC2.html)

[Task definition use cases - Amazon Elastic Container Service](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/use-cases.html)

[Example task definitions - Amazon Elastic Container Service](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/example_task_definitions.html)

[AWS::ECS::TaskDefinition - AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-taskdefinition.html)

[https://github.com/aws/amazon-ecs-cli](https://github.com/aws/amazon-ecs-cli)
