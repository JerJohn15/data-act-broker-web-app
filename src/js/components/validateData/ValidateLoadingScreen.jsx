/**
  * ValidateLoadingScreen.jsx
  * Created by Kevin Li 04/13/16
  */

import React from 'react';
import ValidateDataFilePlaceholder from './ValidateDataFilePlaceholder.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import CommonOverlay from '../SharedComponents/overlays/CommonOverlay.jsx';
import LoadingBauble from '../SharedComponents/overlays/LoadingBauble.jsx';

export default class ValidateLoadingScreen extends React.Component {
	render() {
		const placeholders = [];

		for (let i = 0; i < 3; i++) {
			placeholders.push(<ValidateDataFilePlaceholder key={i} />);
		}

		return (
			<div className="container">
				<div className="row center-block usa-da-submission-items with-overlay">
                    <div className="usa-da-validate-items">
	                    <ReactCSSTransitionGroup transitionName="usa-da-validate-fade" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
		                	<div>
		                		{placeholders}
		                	</div>
                    	</ReactCSSTransitionGroup>
                    </div>
                </div>
                
            	<CommonOverlay 
            		header="Gathering data..."
            		showIcon={true}
            		icon={<LoadingBauble />}
            		iconClass="overlay-animation" />
	            
			</div>
		);
	}
}