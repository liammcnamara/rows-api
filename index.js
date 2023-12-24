
// rows-api - Unofficial rows.com API for NodeJS.

// url package is used for url formatting to include parameters.
var url = require('url')

class rowsapi {

    #api_url = 'https://api.rows.com/';

    #api_version = 'v1';

    #key;

    constructor(API_URL=null, API_VERSION=null, API_KEY) {
        if (!API_URL == null) this.#api_url = API_URL;
        if (!API_VERSION == null) this.#api_version = API_VERSION;
        this.#key = API_KEY;
    }

    async rows_get_request(endpoint,parameters=null) {
        const params = url.format({query: parameters})
        return await fetch(this.#api_url+this.#api_version+'/'+endpoint+params, {
            headers: {Authorization: 'Bearer '+this.#key},
            method: 'GET'
        })
    }

    // Get Workspace Inforamtion
    // /workspaces

    async workspace() {
        return (await this.rows_get_request('workspaces')).json()
    }

    // Get folders
    // /folders

    async folders() {
        return (await this.rows_get_request('folders')).json()
    }

    // List spreadsheets
    // /spreadsheets
    // params folder_id, offset, limit

    async spreadsheets(folder_id=null, offset=null, limit=null) {
        var data = {}

        if (folder_id != null) Object.assign(data, {folder_id: folder_id})
        if (offset != null) Object.assign(data, {offset: offset})
        if (limit != null) Object.assign(data, {limit: limit})

        return (await this.rows_get_request('spreadsheets', data)).json()
    }

    // Get spreadsheet information
    //  /spreadsheets/{spreadsheet_id}
    // params spreadsheet_id*

    async spreadsheet(spreadsheet_id) {
        if(spreadsheet_id == null)
            throw("Spreadsheet id cannot be null");
        return (await this.rows_get_request('spreadsheets/'+spreadsheet_id)).json()
    }

    // Get spreadsheet values from range
    //  /spreadsheets/{spreadsheet_id}/tables/{table_id}/values/{range}
    // params spreadsheet_id* table_id* range* cells (true/false)

    async spreadsheet(spreadsheet_id, table_id, range, cells=false) {
        let cell_or_values = '/values/'
        if(spreadsheet_id == null)
            throw("Spreadsheet id cannot be null");
        if(table_id == null)
            throw("Table id cannot be null");
        if(range == null)
            throw("Range required");
        if(cells) cell_or_values = '/cells/';

        return (await this.rows_get_request('spreadsheets/'+spreadsheet_id+'/tables/'+table_id+cell_or_values+range)).json()
    }
}
  
  module.exports = rowsapi