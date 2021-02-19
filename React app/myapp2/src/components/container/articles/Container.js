import React,{Fragment} from 'react';
import Article01 from './Articles01.js';
import Article02 from './Articles02.js';
import Article03 from './Article03.js';
import Modal01 from './modal/modal01.js';
import Modal02 from './modal/modal02.js';
import Modal03 from './modal/modal03.js';
import Modal04 from './modal/modal04.js';
import Modal05 from './modal/modal05.js';
import Modal06 from './modal/modal06.js';

export default function Container(){
return(

<div className="page-section portfolio" id="portfolioJuanQu">
	<div className="container">
		<h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
			Portafolio
		</h2>
		<div className="divider-custom">
			<div className="divider-custom-line"></div>
			<div className="divider-custom-icon">
				<i className="fas fa-circle"></i>
			</div>
			<div className="divider-custom-line"></div>
		</div>
		<div className="row justify-content-center">
			<Fragment>
			<Article01 />
			</Fragment>

			<Fragment>
				<Article02 />
			</Fragment>

			<Fragment>
				<Article03 />
			</Fragment>

			<Fragment>
				<Article01 />
			</Fragment>

			<Fragment>
				<Article02 />
			</Fragment>

			<Fragment>
				<Article03 />
			</Fragment>

			<Fragment>
				<Modal01 />
			</Fragment>

			<Fragment>
				<Modal02 />
			</Fragment>

			<Fragment>
				<Modal03 />
			</Fragment>

			<Fragment>
				<Modal04 />
				<Modal05 />
				<Modal06 />
			</Fragment>



		</div>
		

	</div>
</div>

);
}