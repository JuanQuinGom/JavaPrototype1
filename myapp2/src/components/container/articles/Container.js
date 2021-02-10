import React,{Fragment} from 'react';
import Article01 from './Articles01.js';

export default function Container(){
return(

<div className="page-section portfolio" id="portfolio">
	<div className="container">
		<h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
			Portfolio
		</h2>
		<div className="divider-custom">
			<div className="divider-custom-line"></div>
			<div className="divider-custom-icon">
				<i className="fas fa-circle"></i>
			</div>
			<div className="divider-custom-line"></div>
		</div>
		<Fragment className="row justify-content-center">
			<Article01 />
		</Fragment>
	</div>
</div>

);
}