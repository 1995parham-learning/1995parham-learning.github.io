_Security Assertion Markup Language, or SAML_, is a standardized way to tell external applications and services that a user is who they say they are. ==SAML makes single sign-on (SSO) technology possible by providing a way to authenticate a user once and then communicate that authentication to multiple applications==. The most current version of SAML is SAML 2.0.

In computing and networking, one of the major challenges is getting systems and devices built by different vendors for different purposes to work together. This is called "interoperability": the ability for different machines to interact with each other, despite their differing technical specifications. SAML is an interoperable standard — it is a widely accepted way to communicate a user's identity to cloud service providers.

## How does SAML work?

A typical SSO authentication process involves these three parties:

- Principal (also known as the "subject")
- Identity provider
- Service provider

**Principal/subject:** This is almost always a human user who is trying to access a cloud-hosted application.

**Identity provider (IdP):** An identity provider (IdP) e.g. Okta is a cloud software service that stores and confirms user identity, typically through a login process. Essentially, an IdP's role is to say, "I know this person, and here is what they are allowed to do." An SSO system may in fact be separate from the IdP, but in those cases the SSO essentially acts as a representative for the IdP, so for all intents and purposes they are the same in a SAML workflow.

**Service provider (SP):** This is the cloud-hosted application or service the user wants to use. Common examples include cloud email platforms such as Gmail and Microsoft Office 365, cloud storage services such as Google Drive and AWS S3, and communications apps such as Slack and Skype. Ordinarily a user would just log in to these services directly, but when SSO is used, the user logs into the SSO instead, and SAML is used to give them access instead of a direct login.

This is what a typical flow might look like:

The principal makes a request of the service provider. The service provider then requests authentication from the identity provider. The identity provider sends a _SAML assertion_ to the service provider, and the service provider can then send a response to the principal.

If the principal (the user) was not already logged in, the identity provider may prompt them to log in before sending a SAML assertion.

## What is a SAML assertion?

A SAML assertion is the message that tells a service provider that a user is signed in. SAML assertions contain all the information necessary for a service provider to confirm user identity, including the source of the assertion, the time it was issued, and the conditions that make the assertion valid.

## In the wild (Okta)

There are two different sign-in flows for which SAML can handle authentication. The first method, an _SP-initiated flow_, occurs when the user attempts to sign onto a SAML-enabled SP via its login page or mobile application (for example, the Box application on an iPhone). Instead of prompting the user to enter a password, an SP configured to use SAML will redirect the user to Okta. Okta will then handle the authentication by prompting the user to log into Okta or via Desktop Single Sign On (DSSO). If the user’s credentials are correct and the user has been granted access to the application on the Okta side, they will be redirected back to the SP as a verified user.

The second flow is known as an _IdP-initiated flow_. This occurs when the user logs into Okta (or launches Okta Mobile) and launches the SP application by clicking its chiclet from their Okta home page. If the user has an account on the SP side, they will be authenticated as a user of the application and will generally be delivered to its default landing page (their actual destination within the SP's site is customizable). If they do NOT currently have an account on the SP side, in some cases, SAML can create the user's account immediately in a process known as Just In Time Provisioning (JIT).

![[Pasted image 20250303062254.png]]

SAML Flow diagram provided by Google

1. The user (e.g. `john@MyBusiness.com`) navigates to the SP’s login page and begins to log in. Some SPs offer a link to "sign in using SSO" on the login page, whereas others can be configured to utilize SAML for all sign-on requests made from usernames with a particular domain (e.g. `http://MyBusiness.com`). SPs that utilize custom login pages (e.g. `https://MyCompany.Dropbox.com`) can often be configured to utilize SAML for ALL login attempts.
2. The SP generates a SAML request and redirects the user to the **Okta Single Sign-On URL** endpoint with the request embedded. This endpoint is unique for each application within each Okta tenant.
3. Once the user is redirected to Okta they’ll need to enter their Okta credentials, unless they had already authenticated into Okta in a previous session within the same browser. In either case, a successful authentication request will redirect the user back to the SP’s **Assertion Consumer Service (ACS)** URL with an embedded SAML response from Okta. At a minimum, the response will:
    1. Indicate that it is indeed from Okta and hasn’t been altered, and contains a digital signature proving such. This signature will be verified by the SP using a public key from Okta that was previously uploaded to the SP as a certificate.
    2. Indicate that the user has authenticated successfully into Okta
    3. Indicate who the user is via the **NameID**, a standard attribute used in SAML assertions.
4. After the SP’s ACS successfully parses the assertion, the user will be sent to the SP’s **default relay state**, which is usually the same page they’d wind up if they’d simply logged into the SP with a username and password. As SPs such as G Suite and Office 365 host several different services, the default relay state will help dictate which specific service to send them to (for example, directly to Outlook Webmail instead of Office 365’s main landing page).
