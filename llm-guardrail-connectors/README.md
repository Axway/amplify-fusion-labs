# LLM and Guardrail Connectors Lab

## Introduction

In these labs, we'll use the OpenAI LLM and Lakera Guardrail connectors to create a chat API and monitor and govern token usage/cost.

In this set of labs, you will learn the following:

* How to create an API and secure it with API Key authentication
* How to create and configure an LLM Connector
* How to configure and using Guardrail Connectors to protect LLM interactions
* How to set LLM quota limits and monitor LLM token and cost usage
* Extra credit: How to orchestrate LLMs fall back/failover
* Extra credit: Add Lakera Guardrail on response

## Prerequisites

* Access to Amplify Fusion with AI Gateway Entitlements
  > If you do not have an account and need one, please send an email to **[amplify-fusion-training@axway.com](mailto:amplify-fusion-training@axway.com?subject=Amplify%20Fusion%20-%20Training%20Environment%20Access%20Request&body=Hi%2C%0D%0A%0D%0ACould%20you%20provide%20me%20with%20access%20to%20an%20environment%20where%20I%20can%20practice%20the%20Amplify%20Fusion%20e-Learning%20labs%20%3F%0D%0A%0D%0ABest%20Regards.%0D%0A)** with the subject line `Amplify Fusion Training Environment Access Request`

* API Keys for the Groq LLM and Lakera Guardrail
  * As of the writing of this lab, you could get a free [Groq](https://groq.com/) account for testing purposes at [https://groq.com/groqcloud](https://groq.com/groqcloud). The free Groq API key can be used with the OpenAI conentor for accessing Groq LLMs as Groq provides an OpenAI-compatible API
  * As of the writing of this lab, you could get a Lakera community account for free for testing purposes at [https://www.lakera.ai/lakera-guard](https://www.lakera.ai/lakera-guard)

* Postman or curl to make REST API calls

* Familiarity with creating, building and governing APIs with Amplify Fusion

NOTES:
* Use labels on your components
* Prefix your project name and API Frontend Base Path with your initials when in a shared lab setting

## Lab 1

In this lab, we will implement a chat API with API Key security and a mock response. In subsequent labs we'll add the LLM and Guardrail and make it functional.

* Create a new Amplify Fusion project to manage this API. Use a unique name in case you're not the only one doing this lab on your tenant (e.g., XX_Chat with XX being your name or initials).\
  ![image](images/lab1_create_project_step1.png)

* Copy the OpenAPI specification [yaml file](assets/chatcompletapi.yml) contents to a local file, `chatcompletapi.yml`, on your file system

* Create a new API (e.g. chat) and browse to the file you created above for the API Specification
  ![image](images/lab1_create_api_step01.png)

* Leave the Backend Server URL empty since we'll be implemnenting the API
  ![image](images/lab1_create_api_step02.png)

* You'll see an API specification with one method: `POST /v1/chatcomple`
  ![image](images/lab1_create_api_step03.png)

* Click the link integration button for `POST /v1/chatcomple` and select Create New Integration
  ![image](images/lab1_create_api_step04.png)

* Enter an integration name, `post-chatcomplete` and click Link Integration and expand the Operations component in your API Server lnked integration and add a map component
  ![image](images/lab1_create_api_step05.png)
  ![image](images/lab1_create_api_step06.png)

We are going to hard code the response for now and later replace with actual data.

* Maximize the map component's configuration panel and do the following:
  * Set status to 200
    ![image](images/lab1_create_api_step07.png)
    ![image](images/lab1_create_api_step08.png)
  * Expand `chatCompleteAPIServerResponse`, then the `200` response and `body` and set `reponse` to `Hello World` and click save
    ![image](images/lab1_create_api_step09.png)
    ![image](images/lab1_create_api_step10.png)

* Go back to the API tab and enter a Frontend Base Path, `/chatapi` and click Save
  ![image](images/lab1_create_api_step11.png)
  
Now let's test the API.

* Activate the API and copy the URL
  ![image](images/lab1_create_api_step12.png)
  ![image](images/lab1_create_api_step13.png)

* Use a curl command as follows to call your API after replacing with your url:

  ```bash
  curl --location 'https://axway-university-design.sandbox.fusion.services.axway.com:4443/chatapi/v1/chatcomplete' \
  --header 'Content-Type: application/json' \
  --data '{
    "usermessage": "Hello"
  }'
  ```

Response should be:

  ```json
  {
      "response": "Hello World!"
  }
  ```

Let's now add API Key authentication.

* Deactivate the API and click the Security tab
  ![image](images/lab1_create_api_step14.png)
  ![image](images/lab1_create_api_step15.png)

* Click the `Inbound Security` picker and select `API Key`
  ![image](images/lab1_create_api_step16.png)

* Click the `Governance Rule` picker and select Create New Governance Rule
  ![image](images/lab1_create_api_step17.png)

* Set the following and click Create and then click Save
  * Name: `APIKey`
  * Key Location: `Header`
  * Key Name: `x-api-key`
    ![image](images/lab1_create_api_step18.png)
    ![image](images/lab1_create_api_step19.png)

* Activate your API

* Go to the Manager module, Application tab and create an application and provide a name (e.g. XX_ChatApp) and click Create
  ![image](images/lab1_create_api_step20.png)
  ![image](images/lab1_create_api_step21.png)

* Add your API and Data plane and add an API Key and copy it
  ![image](images/lab1_create_api_step22.png)
  ![image](images/lab1_create_api_step23.png)
  ![image](images/lab1_create_api_step24.png)

* Use a curl command as follows to call your API after replacing with your url and api key and you should get the same response:

  ```bash
  curl --location 'https://axway-university-design.sandbox.fusion.services.axway.com:4443/chatapi/v1/chatcomplete' \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: DAeB8x3NRSJhr8uU1ydVqrMqfiwufNF7' \
  --data '{
    "usermessage": "Hello"
  }'
  ```

* Deactivate your API

## Lab 2

In this lab we'll add an LLM Connector to process the user input message and create a response. We'll use the Groq with the OpenAI connector.

* Open the linked integration, `post-chatcomplete` and click on the map component and expand the configuration panel
  ![image](images/lab2_step01.png)
  ![image](images/lab2_step02.png)

* Click the trash can next to status and expand `chatCompleteAPIServerResponse`, then the `200` response and `body` and click the trash can next to `response` and click save
  ![image](images/lab2_step03.png)

* Delte the map component
  ![image](images/lab2_step04.png)

Now let's add an OpenAI LLM Connector.

* Click on the plus button and select OpenAI Chat and expand the configuration panel
  ![image](images/lab2_step05.png)
  ![image](images/lab2_step06.png)
  ![image](images/lab2_step07.png)

* Click Add next to the Connection picker to create a new OpenAI connector and give it a name (e.g. OpenAI-Grok)
  ![image](images/lab2_step08.png)
  ![image](images/lab2_step09.png)

* In order to use the OpenAI Connector with Groq, the Endpoint URL needs to change from the OpenAI Endpoint URL of `https://api.openai.com/v1` to Groq's Endpoint URL of `https://api.groq.com/openai/v1`

* Enter a Groq model such as `llama-3.1-8b-instant`

* Enter your Groq API Key wich you can get from the [Groq web site](https://console.groq.com/keys) after signing up for free if you don't already have one

* Click Update and click Test
  ![image](images/lab2_step10.png)

* Click on the Cost & Billing tab and enter 0.05 per 13M input tokens and 0.08 per 13M output tokens as per the Groq [model card](https://console.groq.com/docs/model/llama-3.1-8b-instant) for `llama-3.1-8b-instant` and click udate. This will be used for governance and cost monitoring
  ![image](images/lab2_step11.png)

* Close the connector sub tab and click the refresh button in the Conenction picker in the OpenAI component in your integration and select the `OpenAI-Grok` connector you just configured
  ![image](images/lab2_step12.png)

* Expand the ACTION PROPERTIES `OpenAIChatInput` and `OpenAIChatOutput` to expose the prompt->text and messages[]->text properties and expand the Pipe-out `chatCompleteAPIServerResponse->200` headers and body properties to expose `Content-Type` and `body->response`
  ![image](images/lab2_step13.png)

* Configure the connector as following:
  * Expand Pipe-In `chatCompleteAPIServerRequest/body` and drag a line from `usermessage` to ACTION PROPERTY `OpenAIChatInput/messages[]/text`
  * Right click on ACTION PROPERTIES `OpenAIChatInput/messages[]/type` and Set Value to `USER`
  * Drag a line from ACTION PROPERTIES `OpenAIChatOutput/response/message/text` to Pipe-Out `chatCompleteAPIServerResponse/200/application_json/response`
  * Right click on Pipe-Out `chatCompleteAPIServerResponse/200/headers/Content-Type` and Set Value to `application/json`
  * Right click on ACTION PROPERTIES `OpenAIChatInput/prompt/text` and set the value to 'You are a helpful AI agent`
  * Right click on Pipe-Out `status` and set to 200
  * Click Save
  ![image](images/lab2_step14.png)
  ![image](images/lab2_step15.png)
  ![image](images/lab2_step16.png)
  ![image](images/lab2_step17.png)
  ![image](images/lab2_step18.png)

* Open the API and activate it and call it as you did in Lab 1. This time, you will see an AI response, such as below, instead of 'Hello World':
  ```json
  {
      "response": "Hello, how can I assist you today?"
  }
  ```

Congratulations! You've built your first AI Chatbot API in the AI Gateway!!!

* Open the Monitor module and find your transaction and click on the transaction hyperlink. Click the + button on the + Operations Step and then click on the OpenAI - Chat step and open the OpenAIChatOutput components in the input and output and notice the token reporting
  ![image](images/lab2_step19.png)
  ![image](images/lab2_step20.png)
  ![image](images/lab2_step21.png)

* Try some other messages and check the responses

  For example, my request: `Who won the last FIFA World Cup championship?`, had a response of `The most recent FIFA World Cup took place in 2022 in Qatar. The winner of this championship was Argentina, who won their third World Cup title by defeating France 4-2 in a penalty shootout, after the match ended 3-3 after extra time on December 18, 2022`

* Now, ask your chatbot `Format this into a table: Robert Chen, DOB 03/22/1975, passport number AB1234567, address 142 Oak Street, Austin TX 78701.`

  You should get the data formatted as a table. However, you just sent PII (personally identifiable data to an LLM) and that could be an issue. Let's use a Guardrail to prevent this.

* Deactivate the API

## Lab 3

In this lab we'll add a Guardrail to ensure that unwanted messages do not reach your LLM.

* Open the linked integration and click the plus button to the left of the OpenAI->Chat component, and add a Lakera AI Guard -> Invoke component and expand the configuration panel
  ![image](images/lab3_step01.png)
  ![image](images/lab3_step02.png)

* Click Add next to the Connection picker to create a new Lakera connector and give it a name (e.g. Lakera) and click the Security tab on the connector configration
  ![image](images/lab3_step03.png)
  ![image](images/lab3_step04.png)

* If you don't have a Lakera Guard API Key you can click on the Generate API Key button in the connector sign up or login and create an API Key. Enter your API Key, click Update and click Test
  ![image](images/lab3_step05.png)

* Close the connector sub tab and click the refresh button in the Conenction picker in the Lakera AI Guard component in your integration and select the `Lakera` connector you just configured
  ![image](images/lab3_step06.png)

* Expand the Pipe-In `chatCompleteAPIServerRequest` and ACTION PROPERTIES `LakeraAIGuardInvokeInput` and do the following:
  * Drag Pipe-In `chatCompleteAPIServerRequest/body/usermessage` to ACTION PROPERTIES `LakeraAIGuardInvokeInput/messages[]/text`
  * Right click on ACTION PROPERTIES `LakeraAIGuardInvokeInput/messages[]/type` and set to USER
  * Click Save
    ![image](images/lab3_step07.png)

* Close the Lakera Guard configration panel to expose the integration

Now, we'll check the Lakera response in an `if` statement and if flaged, we'll send a fixed response. If not flagged we'll proceed onto the LLM as before.

* Click on the plus button between the Lakera Guard and OpenAI components and select an `If-else` component and expand the `If-else`
  ![image](images/lab3_step08.png)
  ![image](images/lab3_step09.png)

* Click on the `If-else` Expression button and click the + Add condition button and do the following:
  * Click the Left operand down arrow and select `LakeraAIGuardInvokeOutput/flagged`
  * Select `=` for Operator
  * Type `false` for Right Operand and click Save
    ![image](images/lab3_step10.png)
    ![image](images/lab3_step11.png)
    ![image](images/lab3_step12.png)

* Click the OpenAI component and hold and then drag the component into the top branch of the `If-else` for when the input is not flagged
  ![image](images/lab3_step13.png)
  ![image](images/lab3_step14.png)

* Add a Map component in the other branch of the `If-else` for when the input is flagged and expand it's configuration panel and expand the Pipe-Out `chatCompleteAPIServerResponse`
  ![image](images/lab3_step15.png)
  ![image](images/lab3_step16.png)

* Set the following:
  * Content-Type header to `application/json`
  * Set `response` to `That request does not comply with corporate AI policies and has been logged`
  * Set `status` to `200`
  * Click Save
    ![image](images/lab3_step17.png)

* Activate your API and ask your chatbot `Format this into a table: Robert Chen, DOB 03/22/1975, passport number AB1234567, address 142 Oak Street, Austin TX 78701.`
  * This time the response should be: `That request does not comply with corporate AI policies and has been logged`.

* Ask `Who won the last FIFA World Cup championship?` again and make sure that the Guardrail is not flagging incorrectly.

Congratulations! Now, you've added a guardrail to your chatbot API!

## Lab 4

In this lab we'll look at monitoring and governing LLM usage.

* Open the Manager Module and open the application you created in Lab 1 and click on Usage Controls and click on LLM Quotas. This should be empty.
  ![image](images/lab4_step01.png)

* Click on View Consumption to view the token consumption for this application for different time ranges, chart types and different table views. These are the calls made to Groq in Labs 2 and 3
  ![image](images/lab4_step02.png)
  ![image](images/lab4_step03.png)
  ![image](images/lab4_step04.png)

Let's add an LLM Quota and test it.

* While on the LLM Quotas tab, click the + Add Quotas button
  ![image](images/lab4_step05.png)

* Do the folowing:
  * Click on API/MCP and select All APIs and MCPs
  * Click on Data Plane and select Per Fusion Data Plane Default
  * You can set the quota by cost or token. We'll do token so select token and enter 200 for both intput and output and set Reset Interval to 1 minute and click OK and then click Update
    ![image](images/lab4_step07.png)
    ![image](images/lab4_step08.png)

Note that you can set quotas for peak and daily and monthly limits, etc... but we are simply setting a limit for test purposes.

Go to the Designer module and activate your API and make some calls as before but rapidly until you receive a 429 Too Many Requests response. This is the LLM quota kicking in. Wait a minute and repeat. Again you should receive a 429 Too Many Requests response after a few calls.

## Extra Credit Lab

* Create another Groq OpenAI Connector using a different Groq model
* Modify the integration to check the response from the LLM and if success is false, call your new Connector. This is refered to as LLM failover. You can test by changing the model name of the first Groq OpenAI Connector to force it to fail and see that you failover LLM is called.