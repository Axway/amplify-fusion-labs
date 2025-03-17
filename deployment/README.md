# Deployment Lab

In these labs, we will build a very basic project and integration and version and deploy it. We will also exercise some of the versioning and deployment features. At the end of these labs, you will learn the following:

* How to version a project
* How to deploy a project
* How to override connections
* How to deploy an updated version of a project
* How to rollback a deployment
* How to revert to older version of a project

## Pre-requisites

* Access to Amplify Integration
  > If you do not have an account and need one, please send an email to **[amplify-integration-training@axway.com](mailto:amplify-integration-training@axway.com?subject=Amplify%20Fusion%20-%20Training%20Environment%20Access%20Request&body=Hi%2C%0D%0A%0D%0ACould%20you%20provide%20me%20with%20access%20to%20an%20environment%20where%20I%20can%20practice%20the%20Amplify%20Fusion%20e-Learning%20labs%20%3F%0D%0A%0D%0ABest%20Regards.%0D%0A)** with the subject line `Amplify Integration Training Environment Access Request`
* Access to curl (or Postman)
* Completion of the Hello World hands on labs

## Lab 1

In this lab we'll create, test and version a very basic integration triggered by an HTTP/S Server GET,.

* Create a new project (e.g. deploytest)
* Create an integration (e.g. test)
* Add an HTTP/S Server Get for the Event
![lab1](images/lab1-event-1.png)
* Click Add to create a new HTTP/S Server Connection (e.g. http server)
* Select `HTTPS` for Protocol and `Token` for Authentication and enter `12345` for the Token and click Update
![lab1](images/lab1-httpserver-connection-settings-1.png)
* Return to the integration and click on the HTTP/S Server Get component and click refresh and select the HTTP/S Server Connection you just created
* Enter `test` for the Resource Path
![lab1](images/lab1-httpserver-coomponent-settings-1.png)
* Click on Response and set Body to `Hello from V1`, set Content Type to `text/plain`, check `Send Response before flow execution` and click Save
![lab1](images/lab1-httpserver-coomponent-settings-2.png)
* Enable your integration and copy your URL and call it using curl as follows:
  ```bash
  curl --location '{YOUR INTEGRATION URL}/test' --header 'Authorization: Bearer 12345'
  ```
  The response should be `Hello from V1`

Now that our integration is working, let's version it

* Disable the integration
* Click the History button in your Project and click Create New Version
* Enter a commit message (e.g. initial commit) and click Save
![lab1](images/lab1-create-v1-1.png)
![lab1](images/lab1-create-v1-2.png)

## Lab 2

In this lab we'll deploy our project to LIVE.

> Note that it is best practice to deploy to CHECK first to perform QA but in this lab, we'll skip this intermediate step and go right to LIVE (production) since the steps are basically the same.

* Click the History button in your Project and click the three dots next to V1 and select deploy
![lab2](images/lab2-deploy-version-1.png)
* Enter a Deployment Job name and description (e.g. deploytest_v1_dj) and click on Create Job
![lab2](images/lab2-deploy-version-2.png)
* A new tab will open showing your deployment jobs in the manager module with the deployment job you just created at the top
![lab2](images/lab2-deploy-version-3.png)
* Click the Run button under Actions and select LIVE and click Run Now
![lab2](images/lab2-deploy-version-4.png)

Before we can enable our integration and test it, we need to configure the connection(s) in the project. In this case we have one, the HTTP/S Server connection. We will use the Connection Override feature to accomplish this.

* Switch to the LIVE environment by first closing the Designer tab to make sure you only have one tab open and then click on Live in the Environment picker
![lab2](images/lab2-deploy-version-5.png)
* Select Environments from the Left menu
![lab2](images/lab2-deploy-version-6.png)
![lab2](images/lab2-deploy-version-7.png)
* Click on the Details icon in the Live Environment and then click on Projects
![lab2](images/lab2-deploy-version-8.png)
* Click on the Action icon for your project and select the HTTP/S Server Connection and click next
![lab2](images/lab2-deploy-version-9.png)
* Click Override and select `HTTPS` for Protocol and `Token` for Authentication and enter `abcde` for the Token and click Update and then click Cancel to dismiss the dialog box
![lab2](images/lab2-deploy-version-10.png)

Now we can activate the integration and test it.

* Switch to the Designer module and make sure you are still in LIVE mode
* Open your project and acquire the lock
![lab2](images/lab2-deploy-version-11.png)
* Open the integration and activate it and copy your URL and call it using curl as follows:
  ```bash
  curl --location '{YOUR INTEGRATION URL}/test' --header 'Authorization: Bearer abcde'
  ```
  The response should be `Hello from V1`

## Lab 3

In this lab we'll update our integration, version it to v2 and deploy it. Many of the steps will be a repeat of what we already did in lab 1 and lab 2

* Make sure you only have one tab open and while in LIVE mode disable the integration
* Switch to DESIGN mode and open your project and integration
* Edit the HTTP/S Server GET component and set the response to `Hello from V2` and save
![lab3](images/lab3-deploy-version2-1.png)
* Test your project and make sure your response is `Hello from V2`
* Version your project to v2
![lab3](images/lab3-deploy-version2-2.png)
* Click the 3 dots next to the version and click Deploy
* Give you deployment job a name and description (e.g. deploytest_v2_dj)
![lab3](images/lab3-deploy-version2-3.png)
* Run your deployment job and select LIVE
![lab3](images/lab3-deploy-version2-4.png)
* Make sure you have only one tab open and switch to Designer module and LIVE mode
* Enable your integration and test it and make sure your response is `Hello from V2`

## Lab 4

In this lab we'll roll back the production (LIVE) to v1. This simulates a scenario where we discover that we have a defect in production.

* Make sure you only have one tab open and while in LIVE mode 
* Disable the integration
* Switch to the Manager module, select DESIGN mode and click on Deployments and click on History
![lab3](images/lab4-rollback-version2-1.png)
* Click on the rollback Action button for your v2 deployment and select your deployment only and click OK
![lab3](images/lab4-rollback-version2-2.png)
![lab3](images/lab4-rollback-version2-3.png)
* Since we rolled back our deployment, we will need to redo the Connection override as we did in Lab 2
* Make sure you have only one tab open and switch to Designer module and LIVE mode
* Enable your integration and test it and make sure your response is `Hello from V1`

## Lab 5

In this lab we'll revert our project back to v1 in DESIGN, make modifications and then version it to v3 and deploy it.

* Make sure you have only one tab open and switch to Designer module and DESIGN mode
* Open your project and click on the history icon and click on the 3 dots next to v1
![lab3](images/lab5-deploy-version3-1.png)
* Click on Revert to revert to v1
* Follow the instructions in lab 3 and set your response to `Hello from V3` and test it
* Refresh your browser tab and click on the history icon and create a new version V3
![lab3](images/lab5-deploy-version3-2.png)
![lab3](images/lab5-deploy-version3-3.png)
* Deploy V3 as we did in lab 3 (e.g. deploytest_v3_dj). Remember that you'll need to disable your integration in LIVE prior to running your v3 deployment job
![lab3](images/lab5-deploy-version3-4.png)
* Enable your integration in LIVE and test it and make sure your response is `Hello from V3`
