# Lab CSV Leads File Integration 

## Introduction

Dans cet exercice, nous allons créer une intégration qui nous permettra de SFTP un fichier CSV de prospects et de créer de nouveaux prospects Salesforce basés sur les lignes CSV. La démo est présentée ci-dessous :

![demo](../images/intro-demo.gif)

Le flux est décrit ci-dessous:

* Ingérer un fichier CSV (de leads) via un serveur d'ingestion SFTP
* Analyser le fichier CSV
* Parcourir les lignes et créer les leads sur SFDC

Ce data flow est illustré ci-dessous:

![flow](../images/intro-flow.png)

Dans cette sessions d'exercices, vous allez apprendre à:

* Créer un composant serveur SFTP
* Créer une connexion Salesforce
* Utiliser un composant d'insertion Salesforce et un plug associé pour créer un lead Salesforce
* Utiliser le composant Map pour transformer de la data et utiliser des fonctions

L'intégration finale doit ressembler à ceci:

![integration](../images/lab3-integration.png)

## Prérequis

* Accès à **Amplify Integration**
  > Si vous n'avez pas de compte, veuillez contacter **[amplify-integration-training@axway.com](mailto:amplify-integration-training@axway.com?subject=Amplify%20Integration%20-%20Training%20Environment%20Access%20Request&body=Hi%2C%0D%0A%0D%0ACould%20you%20provide%20me%20with%20access%20to%20an%20environment%20where%20I%20can%20practice%20the%20Amplify%20Integration%20e-Learning%20labs%20%3F%0D%0A%0D%0ABest%20Regards.%0D%0A)** par mail avec en objet `Amplify Integration Training Environment Access Request`
* Une **instance de développeur Salesforce**
  > Si vous n'avez pas d'instance de développeur, les détails pour vous inscrire gratuitement seront fournis dans les étapes ci-dessous.
  > Si vous utilisez déjà Salesforce comme CRM dans votre organisation, n'utilisez pas votre compte d'entreprise pour cet exercice et créez un compte de développeur en n'utilisant pas l'adresse e-mail de votre entreprise comme nom d'utilisateur.
* Un **client SFTP**, tel que [FileZilla](https://filezilla-project.org/download.php?type=client&show_all=1)

## Etape 1

Dans cette étape, nous allons ingérer un fichier CSV de contacts.

* Créer une intégration (par ex: CSVtoSalesforce)
* Cliquer sur event et sélectionner le composant SFTP Server
  ![sftp server poll event](../images/lab1-sftp-server-poll-event.png)
  ![sftp server poll component](../images/lab1-sftp-server-poll-component.png)
* Dans la boîte de dialogue de configuration du composant, cliquer sur Add pour ajouter une nouvelle connexion au serveur SFTP.
* Donnez un nom et une description à votre connexion (par ex: Serveur SFTP).
* Sélectionner Basic Authentication, et entrer un unique nom username et password, puis cliquer sur  Update \
  ![sftp server connection](../images/lab1-sftp-server-connection.png)  
  > Conseil : pour simplifier les choses, vous pouvez utiliser la même valeur pour le username et le password. Dans la capture d'écran ci-dessus, j'ai utilisé thierry-cx15-d pour les deux.

* Fermer l'onglet SFTP Server Connection et retourner à l'intégration
* Cliquer sur le composant SFTP Server Poll, cliquer sur refresh et sélectionner la connexion SFTP Server nouvellement créée dans la liste. Entrer `*.csv` pour File Pattern, laissez les autres valeurs par défaut et cliquer sur Save.
  ![sftp server poll component file pattern](../images/lab1-sftp-server-poll-component-file-pattern.png)
* Votre intégration doit ressembler à ceci: \
  ![integration](../images/lab1-integration.png)

Testons maintenant l'intégration.

* Activer l'intégration en cliquant sur le bouton play à côté du bouton test et Activate the integration by clicking on the play button next to the Test button et commuter l'interrupteur qui se trouve à côté du data plane
* Une fois activé, passez la souris sur l'icône du lien pour voir l'URL SFTP et copiez le lien
![integration](../images/lab1-integration-activation.png)
* Télécharger le fichier leads.csv from [**here**](assets/leads.csv)
* Lancez votre client FTP (par exemple FileZilla) et créez une connexion SFTP au serveur SFTP en utilisant l'URL que vous venez de copier et les informations d'identification de la connexion et connectez-vous au serveur SFTP (si vous utilisez FileZilla, collez simplement l'URL SFTP dans le premier champ et cliquez sur connexion rapide. Assurez-vous de préfixer l'hôte par `sftp://` puis entrez le mot de passe). Sélectionnez le dossier `/incoming` pour le téléchargergement (c'est ce qui déclenchera votre intégration).
  ![filezilla connection](../images/lab1-filezilla-connection.png)
* Télécharger leads.csv dans le dossier `/incoming`ce qui déclenchera votre intégration
* Aller sur le Monitor
  ![monitor dashboard](../images/lab1-monitor-dashboard.png)
* Cliquer sur Transaction
  ![transaction monitoring](../images/lab1-transaction-monitoring.png)
* Cliquer sur l'étape SFTP Server Poll et dérouler`SFTPServerPollOutput` pour voir le node files->0  et son body field pour voir que le file a été ingéré
  ![transaction monitoring details](../images/lab1-transaction-monitoring-details.png)

## Etape 2

Dans cette étape, nous allons parcourir le fichier CSV des contacts afin d'en parcourir les lignes.

* Désactiver l'intégration
* Ajouter un composant FlatFile Parser Read à votre intégration 
  ![add Flat File Parser](../images/lab2-add-flat-file-parser.png)
  ![Flat File Parser read component init](../images/lab2-flat-file-parser-read-component-init.png)
* Cliquer sur Add pour ajouter un Data Object et lui donner un nom (par ex: LeadsCSV) et une description
* Sélectionner FLAT FILE pour le Document Format
  ![data object format](../images/lab2-data-object-format.png)
* Appuyer sur Configure et sélectionner les caractéristiques suivantes:
  * Virgule (,) pour le Delimiter
  * \n pour le New Line Character
  * True pour le Header
  * Cliquer sur Choose File et sélectionner leads.csv
    ![data object configuration](../images/lab2-data-object-configuration.png)
  * Cliquer sur Next, Next puis Create
  * Fermer le sous-onglet LeadsCSV 
* De retour dans notre composant FlatFile Parser Read, élargissez le panneau inférieur, cliquez sur refresh et sélectionnez le nouveau data object que vous venez de créer
  ![Flat File Parser read component](../images/lab2-flat-file-parser-read-component.png)
* Sur le côté gauche (pipeline in), développer le `SFTPServerPollOutput` pour afficher `files -> body` et faire glisser une connexion entre body et `ffString` sous ACTION PROPERTIES puis appuyer sur Save.
  ![Flat File Parser read component input](../images/lab2-flat-file-parser-read-component-input.png)
* Votre intégration doit ressembler à ceci:
  ![integration](../images/lab2-integration.png)
* Activez l'intégration et téléchargez votre fichier CSV, puis vérifiez la transaction dans le Monitor pour voir vos lignes délimitées.
  ![transaction monitoring details](../images/lab2-transaction-monitoring-details.png)

## Etape 3

Dans cette étape, nous allons parcourir les lignes délimitées (contacts) et créer des leads dans Salesforce.

* En continuant là où nous nous sommes arrêtés, désactiver l'intégration et ajouter un composant For-each, le développer et cliquer sur configuration, sélectionner `LeadsCSV->delimitedRecords` et appuyer sur Save.
  ![foreach](../images/lab3-foreach.png)

  ![foreach configuration](../images/lab3-foreach-configuration.png)

  ![foreach configuration inputlist](../images/lab3-foreach-configuration-inputlist.png)
* Ajouter un composant MAP à l'intérieur de la branche de la boucle For-each, le sélectionner et développer le panneau inférieur.
  ![add map](../images/lab3-add-map.png)
  ![map component init](../images/lab3-map-component-init.png)
* Sur le côté droit, effectuer un clique droit n'importe où et sélectionner Extract
  ![map variable extract](../images/lab3-map-variable-extract.png)
* Coller un exemple de Lead Salesforce et cliquer sur Copy node

  ```json
  {
    "FirstName": "Lonni",
    "LastName": "Gadie",
    "Title": "CFO",
    "Email": "lgadie0@reddit.com",
    "Company": "Reallinks",
    "LeadSource": "Partner Referral",
    "Status": "Open - Not Contacted"
  }
  ```

  ![map variable copy](../images/lab3-map-variable-copy.png)
* Sur le côté droit, effectuer à nouveau un clique droit n'importe où et sélectionner Paste, donner un nom à votre variable (par ex: Lead) puis l'étendre pour voir à l'intérieur.
  ![map variable paste](../images/lab3-map-variable-paste.png)
* Dérouler LeadsCSV dans le panneau de gauche pour afficher `delimitedRecords` et ses champs
  ![map expand input](../images/lab3-map-expand-input.png)
* Procédons maintenant au Mapping entre le format CSV et le format JSON.:
  * Commençons par convertir last name en majuscule en utilisant une fonction
    * Cliquer sur +fx, rechercher la fonction UpperCase puis la sélectionner
    ![map add function](../images/lab3-map-add-function.png)
    ![map search function](../images/lab3-map-search-function.png)
    * Faire glisser une ligne de `LeadsCSV->delimitedRecords->last_name` jusque UpperCase inputString et faire glisser une ligne de UpperCase output jusqu'à `leads->LastName`
    ![map select function](../images/lab3-map-select-function.png)
  * Convertissons l'e-mail en minuscules à l'aide d'une fonction. Cliquez sur +fx, recherchez la fonction LowerCase et sélectionnez-la.
    * Faire glisser une ligne de`LeadsCSV->delimitedRecords->email`à LowerCase inputString et Faire glisser une ligne de LowerCase output jusqu'à `leads->Email`
  * Faire glisser une ligne de `LeadsCSV->delimitedRecords->first_name` à  `leads->FirstName`
  * Faire glisser une ligne de `LeadsCSV->delimitedRecords->title` à `Title`
  * Faire glisser une ligne de`LeadsCSV->delimitedRecords->company` à `leads->Company`
  * Faire un clique droit sur `leads->LeadSource` et sélectionner SetValue et paramètrer  la valeur à `Partner Referral`
  * Faire un clique droit sur `leads->Status`, sélectionner SetValue et régler la valeur à `Open - Not Contacted` puis cliquer sur Save
  ![map component](../images/lab3-map-component.png)
  * Fermer le panneau inférieur
* We need to create a Salesforce Connection so follow the instructions [**here**](assets/salesforce-connection.md) to setup a Salesforce Connected OAuth App and an Amplify Integration Salesforce Connection and generate a token and test the connection
  ![saleforce connector](../images/lab3-saleforce-connector.png)
* Close the Salesforce Connection and return to your Integration
* Click the add button to add a Salesforce insert Component and expand the bottom panel and select the newly created Salesforce Connection that we just created
* We need a Plug that defines the lead insert so click on the Plug Add button and provide a name (e.g. CreateLead) and description and then click on Configure
* Select the Salesforce Connection we just created, Insert for the Actions and Lead for the Objects and select FirstName, LastName, Title, Company, Email, LeadSource and Status for the fields and click Generate and then Save and then close the plug and return to the flow (as we did before)
  ![salesforce plug](../images/lab3-salesforce-plug.png)
* Select the newly created plug
* Expand the CreateLeadInput ACTION PROPERTY to expose the insert property
* Drag the leads variable we created prior and drag it to the insert property and press Save
  ![salesforce insert component](../images/lab3-salesforce-insert-component.png)
* Activate the event and test the integration
* This time you should see two new leads added to your Salesforce leads
  ![salesforce new leads](../images/lab3-salesforce-new-leads.png)

Your final flow should like this:

  ![integration](../images/lab3-integration.png)
