import { AccordionSummary } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Controller, useFormContext } from 'react-hook-form';

function AddressTab(props) {
	const methods = useFormContext();
	const { control } = methods;

	return (
		<div>
			<Accordion
						className="border-0 shadow-0 overflow-hidden"
						expanded={map === 'shipping'}
						onChange={() => setMap(map !== 'shipping' ? 'shipping' : false)}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							classes={{ root: 'border border-solid rounded-16 mb-16' }}
						>
							<Typography className="font-semibold">Shipping Address</Typography>
						</AccordionSummary>
						<AccordionDetails className="flex flex-col md:flex-row -mx-8">
							<Typography className="w-full md:max-w-256 mb-16 md:mb-0 mx-8 text-16">
								{order.customer.shippingAddress.address}
							</Typography>
							<div className="w-full h-320 rounded-16 overflow-hidden mx-8">
								<GoogleMap
									bootstrapURLKeys={{
										key: process.env.REACT_APP_MAP_KEY
									}}
									defaultZoom={15}
									defaultCenter={[
										order.customer.shippingAddress.lat,
										order.customer.shippingAddress.lng
									]}
								>
									<Marker
										text={order.customer.shippingAddress.address}
										lat={order.customer.shippingAddress.lat}
										lng={order.customer.shippingAddress.lng}
									/>
								</GoogleMap>
							</div>
						</AccordionDetails>
					</Accordion> 
		</div>
	);
}

export default AddressTab;
