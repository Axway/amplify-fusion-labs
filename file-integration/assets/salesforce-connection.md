# Salesforce connection guide

## Salesforce Setup

- Sign up for a salesforce account using <https://developer.salesforce.com/.> If you use editions other than developer edition, you will have to request Salesforce support to enable API Access as it's not enabled by default.
  ![salesforce01](salesforce-connection/salesforce01.png)

- Provide all required fields and a valid email address.
  ![salesforce02](salesforce-connection/salesforce02.png)

- Once you click on Sign me up, you will get an email.
  ![salesforce03](salesforce-connection/salesforce03.png)
  ![salesforce04](salesforce-connection/salesforce04.png)

- Verify account by clicking on Verify Account button in the email.

- Set password to your account
  ![salesforce05](salesforce-connection/salesforce05.png)

- Now you are able to login to your salesforce developer account.

- Go to [https://login.salesforce.com](https://login.salesforce.com/).

- Enter your Username and Password click on LogIn.
  ![salesforce06](salesforce-connection/salesforce06.png)

- After Login, you will get verification code to your registered email account. Fill the code and verify.
  ![salesforce07](salesforce-connection/salesforce07.png)

- In the left navigation panel, Under Apps, Click on App Manager to create a new app or edit existing app
  ![salesforce08](salesforce-connection/salesforce08.png).

- Click New connected App for creating a new app
  ![salesforce09](salesforce-connection/salesforce09.png)

- Fill up the required fields in the Basic Information
  ![salesforce10](salesforce-connection/salesforce10.png)

- Enable OAuth Settings should be checked.

- Enter the Callback URL. For example, if your access URL is [https://test.dxchange.cloud](https://test.dxchange.cloud/), your callback URL will be    <https://test.dxchange.cloud/design/oauth2/callback>

- Choose the following scopes in the Selected available OAuth Scopes.
  - Full access (full)
  - Manage user data via APIs (api)
  - Perform requests at any time (refresh_token, offline_access)
![salesforce11](salesforce-connection/salesforce11.png)

- Save all settings and then click Continue.

- Save the Consumer Key (Client ID) and Consumer Secret (Client Secret) displayed after clicking Continue.
  ![salesforce12](salesforce-connection/salesforce12.png)

- These above details must be used when creating your Salesforce connection on Amplify Integration

## Amplify Integration Setup

- You must configure Salesforce Connection to connect to your Salesforce instance.

- Navigate to **New** in the top right corner.
![salesforce13](salesforce-connection/salesforce13.png)

- Select the **Connections** tab from the left side menu, choose the **Salesforce** connection and then click **Next**.
![salesforce14](salesforce-connection/salesforce14.png)

- Enter the **Name**, **Description**, select the **Project** and then click **Create**.
![salesforce15](salesforce-connection/salesforce15.png)

- To configure the connection, enter the following details:
![salesforce16](salesforce-connection/salesforce16.png)

- Select the OAuth2.0 connection type

- Base URL (Required) --

  - Subdomain -- You can get your domain by clicking on the Avatar on the top right corner of Salesforce application

  - Version -- 46.0, 52.0 etc
    ![salesforce17](salesforce-connection/salesforce17.png)

  - Replace your subdomain and version in the below URL
    `https://{subdomain}.my.salesforce.com/services/data/v{version}`

- ClientID (Required) -- Enter ClientID of the salesforce instance

- Client Secret (Required) -- Enter Client Secret of the salesforce instance, which will be saved in the encrypted format.

- After entering the above details, click **Update** to save the connection details.

- Click on [Generate token] to Allow access. Once token is generated, click on [Test button] as shown below.

![salesforce18](salesforce-connection/salesforce18.png)
![salesforce19](salesforce-connection/salesforce19.png)

- **Note:** A **Green Tick** mark indicates a successful Connection
    Test, while an **Error Popup** indicates wrong connection details as
    shown in the screenshots below. 

![salesforce20](salesforce-connection/salesforce20.png)
