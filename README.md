# Reverse_auction

## NOTE -  This is a work in progress, not a complete project. 

More info will be made available soon. 

The purpose of Reverse Auction is create a simple, DynamoDB-backed wesbite to manage reverse auctions, that is an auction where the lowest bidder wins. 

## Current Status
This is actively being worked on, and includes the following platforms:
- DynamoDB
- Node.JS
- Pug
- Docker

The environment is currently configured to us a local development instance of DynamoDB. Information on how to do this using Docker can be found at [https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html).

## Project Goals
- To provide a simple interface for managing reverse auctions. 
  - Simple, containerized deployment with self-healing capabilities.
  - Management of multiple simulataneous auctions. 
  - Segmentation and preservation of bidder privacy.
  - Easy style customization and presentation of relevant auction information. 
