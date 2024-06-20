# Deployment Block

This is a project for getting the first transaction (and more importantly block number) of an address (deployment tx and block for contracts)

## Getting Started

### Installation

To run the project, first install the packages with:

```sh
yarn install
```

### Usage

To start the script, use the following command, replacing `<your address>` with the Ethereum address you want to analyze:

```sh
yarn start -- <address>
```

## Functionality

The script scans the entire Ethereum blockchain (from block 0 to the present) and retrieves the first transaction found for a given address
