# Anti-Chain Analyser

##Overview

Traditional payment systems have the AML/KYC combined with transaction history for financial organizations to make some decisions about a particular customer. A use case is a customer requesting a loan. Loan companies perform some sort of analysis to know if the customer is eligible or not. This process is easy in the centralized system because the loan company only needs to query a source to see how often the customer carries out transactions which in turn aids their decision. In a decentralized system, bitcoin, for example, transactions are publicly available for anyone to view but these transaction activities are not tied to a user or personal identification information making it difficult to trace fraudulent transactions. In bitcoin, chain analysis can be used to trace transactions by combining a series of heuristics to follow a user’s activity over multiple transactions.
The aim of this document is to describe an anti-chain analysis service (API) that returns the best UTXO combination to use in a future transaction based on the input given, in a bid to help the user preserve their privacy by defeating chain analysis.


[//]: # (![demo]&#40;./image/landingpage.jpeg&#41;)


## Features

- [x] Request (a set of) UTXOs from users.
- [x] Request for amount from users trying to analyze UTXOs to spend for a transaction.
- [x] Apply the heuristics algorithm to the provided UTXOs.
- [x] Return UTXOs combination that best optimizes user privacy.

## Goal
Use the different heuristics approach to evaluate sets of UTXO with respect to the provided amount. Some of the heuristics that will be explored include:

**The unnecessary Input Heuristic:** is used to counter change detection Although this will require the user to pass more UTXO that sums to an amount greater than the intended amount.

**Shadow heuristic:** when an address is reused, it’s easy to tell which address is the change address. This service will use this heuristic to prevent sending transaction funds back to any of the previous output script

##Not Goal
We’re aware some of the heuristics used might incur more miner fees. The service is tailored towards privacy and not fee estimation/reduction.

##Architecture
Web Client: consumes APIs from the backend and sends analysis results to the user. The frontend will be built with React js which can be rendered on a browser, be it on a mobile phone or a computer.

Backend: The frontend interacts with the node express server (backend) via REST APIs. The backend is written with Typescript.

Bitcoin Node: The UTXO analyzer interacts directly with the bitcoin node instead of trusting third-party APIs like https://blockstream.info for UTXO-related data.

## Installation

The anti-chainanalyser connects to a [Bitcoin node](https://github.com/bitcoin/bitcoin/blob/master/README.md), so a running Bitcoin node is required.

You need to have [Node](https://nodejs.org/en/download/) installed. Simply download the binary and run it!
Ensure the the below command runs

1. `$ node -v`
2. `$ npm -v`
3. `$ git clone https://github.com/Jennycj/anti-chainanalysis.git `

## Start Client
```
$ cd /anti-chainanalysis/client/anti-chainanalysis
$ npm install
$ npm run start

```

## Start Server
```
$ cd /anti-chainanalysis/server
$ npm install
$ npm run dev
```

**Note** : The anti-chainanalyser runs on port 4000 by default.

