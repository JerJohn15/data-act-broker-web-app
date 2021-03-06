/**
  * ScrollableTable.jsx
  * Created by Kevin Li 4/5/2016
  */

import React, { PropTypes } from 'react';
import TableRow from './TableRow.jsx';
import TableHeaders from './TableHeaders.jsx';

const propTypes = {
    data: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
    sortable: PropTypes.bool,
    onSort: PropTypes.func,
    cellClasses: PropTypes.array,
    headerClasses: PropTypes.array
};

const defaultProps = {
    data: [['Error']],
    headers: ['Table Data Missing'],
    sortable: false,
    cellClasses: [],
    headerClasses:[],
    unsortable: []
};

export default class FormattedTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			sort: {
				direction: '',
				col: -1
			}
		};
	}

	sortTable(direction, col) {
		this.props.onSort(direction, col);
		this.setState({
			sort: {
				direction: direction,
				col: col
			}
		});
	}

	render() {
		const tableRows = [];
        for (let i = 0; i < this.props.data.length; i++) {
            tableRows.push(<TableRow key={i} data={this.props.data[i]} cellClasses={this.props.cellClasses[i]} />);
        }
		return (
			<div className="usa-da-formatted-table">
				<div className="usa-da-table-header">
					<table className="usa-da-table table-bordered">
						<thead>
		                    <TableHeaders data={this.props.headers} sortable={this.props.sortable} unsortable={this.props.unsortable} onSort={this.sortTable.bind(this)} currentSort={this.state.sort} headerClasses={this.props.headerClasses} />
		                </thead>
		            </table>
	            </div>
	           	<div className="usa-da-table-content">
		            <table className="usa-da-table table-bordered">
		            	<tbody>
		                    {tableRows}
		                </tbody>
		            </table>
		        </div>
			</div>
		);
	}
}

FormattedTable.propTypes = propTypes;
FormattedTable.defaultProps = defaultProps;
