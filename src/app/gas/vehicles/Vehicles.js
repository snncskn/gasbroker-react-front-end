import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import reducer from '../store';
import VehiclesHeader from './VehiclesHeader';
import VehiclesTable from './VehiclesTable';

function Vehicles() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<VehiclesHeader />}
			content={<VehiclesTable />}
			innerScroll
		/>
	);
}

export default withReducer('gas', reducer)(Vehicles);
