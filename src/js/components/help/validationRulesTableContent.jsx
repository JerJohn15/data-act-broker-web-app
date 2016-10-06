/**
 * validationRulesTableContent.jsx
 * Created by Emily Gullo 9/15/2016
 **/

import React from 'react';
import $ from 'jquery';
import Reactable from 'reactable';
import { generateProtectedUrls } from '../../helpers/util.js';
import { loadValidationTable } from '../../helpers/helpHelper.js';


export default class ValidationRulesTableContent extends React.Component {

    constructor(props) {
        super(props);

		this.urlPromise = null;

        this.state = {
            data: [],
            fullData: [],
			validationRulesUrl: '#',
            domainValuesUrl: '#'
        };

        this.sortFunction = (a, b) => {
            const reA = /[^a-zA-Z]/g;
            const reN = /[^0-9]/g;
            const aA = a.replace(reA, "");
            const bA = b.replace(reA, "");
            if (aA === bA) {
                const aN = parseInt(a.replace(reN, ""), 10);
                const bN = parseInt(b.replace(reN, ""), 10);
                return aN === bN ? 0 : aN > bN ? 1 : -1;
            } else {
                return aA > bA ? 1 : -1;
            }
        };
    }

    componentDidMount() {
		// also load the remaining URLs
		this.urlPromise = generateProtectedUrls();
		this.urlPromise.promise
			.then((urls) => {
				this.setState({
					validationRulesUrl: urls['Validation_Rules.xlsx']
				});

				this.urlPromise = null;
		});



        loadValidationTable()
            .then((results) => {
                // logic
                this.setState({
                    data: results.data,
                    fullData: results.data
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

	componentWillUnmount() {
        // cancel in-flight S3 signing requests when the component unmounts
        if (this.urlPromise) {
            this.urlPromise.cancel();
        }
    }

    render() {
        return (
            <div className="usa-da-help-content">
                <div className="validation-table">
                	<h2>Validations</h2>
                    <p>Below is a cumulative table of validations in the RSS and IDD. The status column indicates whether they are currently implemented in the Broker. The table has been revised to match the latest Validations Rules spreadsheet. The Validations Rules spreadsheet, with change log, is available for download.  <a href={this.state.validationRulesUrl} target="_blank">Download file</a></p>
                    <p>In response to agency feedback, Treasury has changed some validations in the Broker from critical errors to warnings in order to allow agencies to continue past their File A-C validations and access the file extracts for D1 and D2 more easily. The validations that have been modified are marked in the validation rules table that can be accessed via the Help page. These validation rules will revert back to critical errors at a later date.</p>
                    <Reactable.Table className="table usa-da-table table-bordered"
                        data={this.state.data} filterable={['Rule Detail']}
                        sortable={
                            [
                                {
                                    column: 'Rule Name',
                                    sortFunction: this.sortFunction
                                }
                            ]
                        }
                        defaultSort={{column: 'Rule Name', direction: 'asc'}}
                        filterPlaceholder="Rule Detail Search..."
                        noDataText="No matching records found." />

                    </div>
            </div>
        );
    }
}
