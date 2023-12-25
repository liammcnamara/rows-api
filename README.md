# Rows.com API for Javascript
The *unofficial* Rows.com API for NodeJS provides developers with the ability to integrate with rows.com spreadsheets easily within their applications.

Currently, v1.0 only supports GET requests from the rows.com API.

Further information about Rows.com API can be found at https://developers.rows.com/.

## To-do

1. Implement POST requests
2. Enhance error handling

# How to use

## Installation

From commandline, install using the node package manager:

```
npm install rows-api
```

## Constructor

There are three permissible parameters passed to the constructor:

* API_KEY - *required* for the bearer authentication
* API_URL - *optional* is the default API URI for rows.com but can be overridden
* API_VERSION - *optional* is the default API version for rows.com but can be overriden
  
```
constructor(API_KEY, API_URL='https://api.rows.com/', API_VERSION='v1')
```

## Usage
```
const rowsapi = require('rows-api')
const myrows_app = new rowsapi(API_KEY=secret_key)
```

Retrieve workspaces:
```
myrows_app.workspace().then(
    res => {
        console.log('Workspaces in my Rows.com account')
        console.log(res)
    }
)
```
Output:
```
Workspace in my Rows.com account
{
  id: '{... guid ...}',
  name: 'ACME Company',
  slug: 'acmecompany',
  created_at: '2022-11-05T10:43:13.714Z'
}
```

Other functions that follow the same usage:
* *folders()*
* *spreadsheets(folder_id=null, offset=null, limit=null)*
* *spreadsheet(spreadsheet_id)*
* *spreadsheet_rows(spreadsheet_id, table_id, range, cells=false)*

## Retrieving spreadsheet rows

The values in cells or the cells, formulas etc, can be retrieved using the same function but setting the cells boolean parameter.

```
spreadsheet_rows(spreadsheet_id, table_id, range, cells=false)
```

### Get values from a range

This will return the values in the cells.

```
const rowsapi = require('rows-api')
const myrows_app = new rowsapi(API_KEY=secret_key)

myrows_app.spreadsheet_rows(spreadsheet_id='... id ...', '... table_id ...', '... range e.g. A1:A3 ...').then(
    res => {
        console.log('Spreadsheet with table values range')
        console.log(res)
    }
)
```
Output:
```
Spreadsheet with table values range
{
  items: [ [ 'Value 1' ], [ 'Value 2' ], [ 'Value 3' ] ]
}
```
### Get cells from a range

This will return the cell itself, such as formulas etc.

```
const rowsapi = require('rows-api')
const myrows_app = new rowsapi(API_KEY=secret_key)

myrows_app.spreadsheet_rows(spreadsheet_id='... id ...', '... table_id ...', '... range e.g. A1:A3 ...', true).then(
    res => {
        console.log('Spreadsheet with table cells from range')
        console.log(res)
    }
)
```
Output:
```
Spreadsheet with table cells from range
{ items: [ [ [Object] ], [ [Object] ], [ [Object] ] ] }
```
