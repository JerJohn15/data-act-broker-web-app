/**
 * ReviewDataContent.jsx
 * Created by Mike Bray 3/28/16
 **/

import React, { PropTypes } from 'react';
import $ from 'jquery';
import { kGlobalConstants } from '../../GlobalConstants.js';
import SubmitButton from '../SharedComponents/SubmitButton.jsx';
import ReviewDataContentRow from './ReviewDataContentRow.jsx';
import ReviewDataButton from './ReviewDataButton.jsx';
import ReviewDataNotifyModal from './ReviewDataNotifyModal.jsx';
import moment from 'moment';

import * as ReviewHelper from '../../helpers/reviewHelper.js';
import * as Icons from '../SharedComponents/icons/Icons.jsx';

const propTypes = {
    submissionID: PropTypes.string
};

export default class ReviewDataContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openModal: false
        };
    }

    notifyUser(e) {
        e.preventDefault();

        this.setState({
            openModal: true
        });
    }

    closeModal(e) {
        if (e) {
            e.preventDefault();
        }
        this.setState({
            openModal: false
        });
    }


    render() {
        
        // The first parameter in each of these arrays is the corresponding class for the SVG icon
        const buttonContent = [[<Icons.CheckCircle />,'Publish this data to USAspending.gov'],
                                [<Icons.ShareSquare />,'Send this data to another Data Broker user'],
                                [<Icons.CloudDownload />,'Download this data to your computer'],
                                [<Icons.Trash />,'Delete this data from the Data Broker']];

        let buttons = [];
        for (let i = 0; i < buttonContent.length; i++){
            buttons.push(<ReviewDataButton key={i} icon={buttonContent[i][0]} label={buttonContent[i][1]} />);
        }

        const reportName = this.props.data.cgac_code.replace(/ /g,'_') + '_' + moment(this.props.data.created_on, 'MM/DD/YYYY').format('DDMMYYYY')  + '_' + this.props.submissionID;
        let fileSize = 0;

        for (let k = 0; k < this.props.data.jobs.length; k++){
            fileSize += this.props.data.jobs[k].file_size;
        }

        const reportLabels = ['Agency Name:', 'Report Start Date:', 'Report End Date:', 'Total Obligations Incurred:', 'Total Financial Assistance Obligations:', 'Total Procurement Obligations:'];

        const reportData = [
            '--',
            this.props.data.reporting_period_start_date,
            this.props.data.reporting_period_end_date,
            '--',
            '--',
            '--'
        ];

        let reportRows = [];

        for (let j = 0; j < reportLabels.length; j++){
            reportRows.push(<ReviewDataContentRow key={j} label={reportLabels[j]} data={reportData[j]} />);
        }

        return (
            <div className="container">
                <div className="row center-block mt-60">
                    <div className="col-md-12 text-center">
                        <h5 data-testid="review-header">Congratulations your data has been successfully validated! Now, what would you like to do with it?</h5>
                    </div>
                </div>
                <div className="center-block usa-da-review-data-content-holder">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="usa-da-file-wrap">
                                <div className="usa-da-icon usa-da-icon-CheckCircle">
                                    <Icons.CheckCircle />
                                </div>
                                <div className="usa-da-submission-info">
                                    <ul className="no-bullet">
                                        <li>Total File Size: <strong>{fileSize}</strong></li>
                                        <li>Total Rows: <strong>{this.props.data.number_of_rows}</strong></li>
                                        <li>Created on: <strong>{this.props.data.created_on}</strong></li>
                                        <li>Total Warnings: <strong></strong></li>
                                    </ul>
                                    <ul className="usa-da-submission-bottom-links no-bullet">
                                        <li><a href="#"><span className="usa-da-icon usa-da-icon-CloudDownload"><Icons.CloudDownload /></span>Download</a></li>
                                        <li><a href="#"><span className="usa-da-icon usa-da-icon-Trash"><Icons.Trash /></span>Delete</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 usa-da-review-data-alternating-rows">
                            {reportRows}
                        </div>
                    </div>
                    <div className="row usa-da-submission-bottom-big-links mt-20">
                        <div className="col-md-6">
                            <a href="#" className="usa-da-button btn-primary btn-lg btn-full"><span className="usa-da-icon usa-da-icon-Globe"><Icons.Globe /></span>Certify & Publish the Submission to USASpending.gov</a>
                        </div>
                        <div className="col-md-6 usa-da-submission-bottom-big-links">
                            <a href="#" onClick={this.notifyUser.bind(this)} className="usa-da-button btn-primary btn-lg btn-full last"><span className="usa-da-icon usa-da-icon-Bell"><Icons.Bell /></span>Notify Another User that the Submission is Ready for Certification</a>
                        </div>

                        <div id="reviewDataNotifyModalHolder">
                            <ReviewDataNotifyModal {...this.props} closeModal={this.closeModal.bind(this)} isOpen={this.state.openModal} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReviewDataContent.propTypes = propTypes;
