# Amplify Integration - Hello World Lab


In these labs, we will start from the scratch and build some very basic integrations. </br></br>
At the end of these labs, you will learn the following:

* Two ways to trigger an integration (Webhook and Scheduler)
* How to view the integration execution
* How to enable/disable integrations
* The HTTP/S Server event trigger and the HTTP/S Client and if-else Components
* How to create an HTTP/S Server and HTTP/S Client Connection
* How to use the drag and drop features to configure components

As you go through the labs, take the time to explore more about the items related to what you are working on. For example, when you are instructed to add an if-else component, explore what other components are available.

## Pre-requisites

* Access to Amplify Integration

  If you do not have an account and need one, please send an email to amplify-integration-training@axway.com with the subject line `Amplify Integration Training Environment Access Request`

* Access to [**Webhook.site**](https://webhook.site/) or [**Pipedream**](https://pipedream.com/) or the equivalent that you can use to send API requests to for analysis. In the instruction, I will refer to webhook site to mean whatever service you are using

## Logging In

* Login into Amplify Integration

  ![login screen](images/login-screen.png)

* Click on Designer

  ![homepage](images/homepage.png)

* Expand the menu panel on the left

  ![designer](images/designer.png)

* Select Projects

  ![designer menu](images/designer-menu.png)

* Click on or Create a New Project

  ![projects list](images/projects-list.png)

* This is where we will do our design work

  ![project content](images/project-content.png)

The labs below are intended to be exploratory. Instructions are provided but you will need to figure out how to accomplish them.

## Lab 1

* Create integration
* Add Scheduler trigger
* Click test
* See transaction in monitor

## Lab 2

* Add HTTP/S Client Post Component
* See bottom panel
* Label the component (send to webhook site)
* Expand bottom panel
* Click Add on Connection
  * Provide a name (webhook site)
  * Select https
  * Paste url for webhook site (WITHOUT THE PROTOCOL)
  * Select Basic Authentication
  * Enter username and password (abcd/1234) and click update
  * Close tab
* Go back to integration -> HTTP/S Client POST Component and select the Connection we just made
* Expand the HTTPSPostInput flyout in the ACTION PROPERTIES section
* Right click on body and select Set Value
* Enter simple JSON body and press save

  ```json
  {
    "text": "Hello world"
  ‌}
  ```
  
* Right click on basePath and select Set Value
* Enter any base path (e.g. /v1/search)
* Click save on the panel
* Click the Test button to test your flow
* See results in webhook site and see the Authorization Header and body

## Lab 3

* Remove the Scheduler trigger and replace with HTTP/S Server Server trigger
* Click add on Connection
  * Provide a name (HTTPS Server)
  * Select HTTPS
  * Leave authentication as None
  * Click update
* Go back to integration -> HTTP/S Server GET Component and select the Connection we just made
* Add a resource path (name must be unique)
* Add a query parameter (value)
* Copy the url to a notepad and press Save
* Click on the HTTP/S Client POST component (webhook site) and expand the bottom panel
* Expand the HTTPSPostInput flyout in the ACTION PROPERTIES section
* Click the delete button on the body
* Expand the HTTPSServerGetOutput flyout and the queryParameters flyout on the left hand side of the panel
* Drag value over to body and click save
* Click the Test button to test your flow and see that you cannot do that. We will need to trigger our integration with an API call
* Enable the flow with the toggle switch
* In a separate browser tab paste the URL you copied before and enter a value for value
* See results in webhook site and see the body should equal the value you provided as a query parameter
* Go to the Monitor and view the transaction and explore the information there that is useful for debugging

## Lab 4

* Disable to integration so it can be edited
* Click the plus sign between the two components and add an if-else
* Set the expressions condition so that it's checks if value is greater than 10
* Drag the webhook HTTP/S Client POST component inside the true path
* Enable your integration and trigger it with values greater than and less than 10 to see that only those greater than 10 are sent to webhook site
