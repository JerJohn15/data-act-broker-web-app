/**
* AddDataHeader.jsx
* Created by Kyle Fox 2/19/16
**/

import React from 'react';
import moment from 'moment';

import * as ReviewHelper from '../../helpers/reviewHelper.js';

class LastUpdated extends React.Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <div className="last-updated">
                Last Saved: {this.props.last_updated}
            </div>
        );
    }
}

const defaultProps = {
    title: 'Upload & Validate a New Submission'
};

export default class AddDataHeader extends React.Component {
    constructor(props) {
        super(props);

        this.isUnmounted = false;

        this.state = {
            submissionID: null,
            last_updated: null,
            ready: false
        };
    }

    componentDidMount() {
        this.isUnmounted = false;
        if (this.props.submissionID != null) {
            ReviewHelper.fetchStatus(this.props.submissionID)
                .then((data) => {
                    data.ready = true;
                    if (!this.isUnmounted) {
                        this.setState(data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    componentWillUnmount() {
        this.isUnmounted = true;
    }

    render() {
        let lastUpdated = null;
        if (this.state.ready && this.state.last_updated){
            let formattedTime = moment.utc(this.state.last_updated).local().format('h:mm a');
            lastUpdated = <LastUpdated last_updated={formattedTime} />
        }

        return (
            <div className="usa-da-content-dark">
                <div className="container">
                    <div className="row usa-da-content-add-data usa-da-page-title flex-center-content-only-height">
                        <div className="col-md-10 mt-40 mb-20">
                            <div className="display-2" data-contentstart="start" tabIndex={-1}>{this.props.title}</div>
                        </div>
                        <div className="col-md-2">
                            {lastUpdated}
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

AddDataHeader.defaultProps = defaultProps;