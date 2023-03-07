[Salesforce]{.underline}

[Salesforce Setup]{.underline}

-   Sign up for a salesforce account using
    <https://developer.salesforce.com/.> If you use editions other than
    developer edition, you will have to request Salesforce support to
    enable API Access as it's not enabled by default.

![](./media/image1.png){width="6.5in" height="2.6666666666666665in"}

-   Provide all required fields and a valid email address.

![](./media/image2.png){width="6.5in" height="4.416666666666667in"}

-   Once you click on Sign me up, you will get an email.

![](./media/image3.png){width="6.5in" height="3.3541666666666665in"}

![](./media/image4.png){width="6.0625in" height="3.84375in"}

-   Verify account by clicking on Verify Account button in the email.

-   Set password to your account

> ![](./media/image5.png){width="4.479166666666667in"
> height="5.28125in"}

-   Now you are able to login to your salesforce developer account.

-   Go to [https://login.salesforce.com](https://login.salesforce.com/).

-   Enter your Username and Password click on LogIn.

> ![](./media/image6.png){width="5.0in" height="4.395833333333333in"}

-   After Login, you will get verification code to your registered email
    account. Fill the code and verify.

![Inserting image\...](./media/image7.png){width="5.989584426946632in"
height="2.78125in"}

-   In the left navigation panel, Under Apps, Click on App Manager to
    create a new app or edit existing app

![](./media/image8.png){width="5.66666447944007in"
height="4.229166666666667in"}.

-   Click New connected App for creating a new app

![](./media/image9.png){width="6.5in" height="3.25in"}

-   Fill up the required fields in the Basic Information

![](./media/image10.png){width="6.5in" height="2.7291666666666665in"}

-   Enable OAuth Settings should be checked.

-   Enter the Callback URL. For example, if your access URL is
    [https://test.dxchange.cloud](https://test.dxchange.cloud/), your
    callback URL will be
    <https://test.dxchange.cloud/design/oauth2/callback>

-   Choose the following scopes in the Selected available OAuth Scopes.

    -   Full access (full)

    -   Manage user data via APIs (api)

    -   Perform requests at any time (refresh_token, offiline_access)

![](./media/image11.png){width="6.5in" height="2.5208333333333335in"}

-   Save all settings and then click Continue.

-   Save the Consumer Key (Client ID) and Consumer Secret (Client
    Secret) displayed after clicking Continue.

![](./media/image12.png){width="6.5in" height="2.5833333333333335in"}

-   These above details must be used when creating your Salesforce
    connection on Amplify Integration

[Amplify Integration Setup]{.underline}

-   You must configure Salesforce Connection to connect to your
    Salesforce instance.

-   Navigate to **New** in the top right corner.

![](./media/image13.png){width="6.08333552055993in"
height="2.2291666666666665in"}

-   Select the **Connections** tab from the left side menu, choose
    the **Salesforce **connection and then click **Next**.

![](./media/image14.png){width="5.29166447944007in" height="3.75in"}

-   Enter the **Name**, **Description**, select the **Project** and then
    click **Create**.

![](./media/image15.png){width="4.666666666666667in" height="3.3125in"}

-   To configure the connection, enter the following details:

![](./media/image16.png){width="6.5in" height="2.6875in"}

-   Select the OAuth2.0 connection type

-   Base URL (Required) --

    -   Subdomain -- You can get your domain by clicking on the Avatar
        on the top right corner of Salesforce application

    -   Version -- 46.0, 52.0 etc

> ![](./media/image17.png){width="5.0in" height="1.40625in"}
>
> Replace your subdomain and version in the below URL

-   ClientID (Required) -- Enter ClientID of the salesforce instance

-   Client Secret (Required) -- Enter Client Secret of the salesforce
    instance, which will be saved in the encrypted format.

-   After entering the above details, click **Update** to save the
    connection details.

-   Click on [Generate token]{.mark} to Allow access. Once token is
    generated, click on [Test button]{.mark} as shown below.

> ![](./media/image18.png){width="2.6458333333333335in" height="3.25in"}

![](./media/image19.png){width="4.020833333333333in"
height="3.8958333333333335in"}

-   **Note:** A **Green Tick** mark indicates a successful Connection
    Test, while an **Error Popup** indicates wrong connection details as
    shown in the screenshots below.

> ![](./media/image20.png){width="2.9791666666666665in"
> height="3.5625in"}
