_Security Assertion Markup Language, or SAML_, is a standardized way to tell external applications and services that a user is who they say they are. ==SAML makes single sign-on (SSO) technology possible by providing a way to authenticate a user once and then communicate that authentication to multiple applications==. The most current version of SAML is SAML 2.0.

In computing and networking, one of the major challenges is getting systems and devices built by different vendors for different purposes to work together. This is called "interoperability": the ability for different machines to interact with each other, despite their differing technical specifications. SAML is an interoperable standard — it is a widely accepted way to communicate a user's identity to cloud service providers.

## How does SAML work?

A typical SSO authentication process involves these three parties:

- Principal (also known as the "subject")
- Identity provider
- Service provider

**Principal/subject:** This is almost always a human user who is trying to access a cloud-hosted application.

**Identity provider:** An _identity provider (IdP) e.g. Okta_ is a cloud software service that stores and confirms user identity, typically through a login process. Essentially, an IdP's role is to say, "I know this person, and here is what they are allowed to do." An SSO system may in fact be separate from the IdP, but in those cases the SSO essentially acts as a representative for the IdP, so for all intents and purposes they are the same in a SAML workflow.

**Service provider:** This is the cloud-hosted application or service the user wants to use. Common examples include cloud email platforms such as Gmail and Microsoft Office 365, cloud storage services such as Google Drive and AWS S3, and communications apps such as Slack and Skype. Ordinarily a user would just log in to these services directly, but when SSO is used, the user logs into the SSO instead, and SAML is used to give them access instead of a direct login.

This is what a typical flow might look like:

The principal makes a request of the service provider. The service provider then requests authentication from the identity provider. The identity provider sends a _SAML assertion_ to the service provider, and the service provider can then send a response to the principal.

If the principal (the user) was not already logged in, the identity provider may prompt them to log in before sending a SAML assertion.

## What is a SAML assertion?

A SAML assertion is the message that tells a service provider that a user is signed in. SAML assertions contain all the information necessary for a service provider to confirm user identity, including the source of the assertion, the time it was issued, and the conditions that make the assertion valid.
