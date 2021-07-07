import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import reducer from '../store';
import ProductsHeader from './ProductsHeader';
import ProductsTable from './ProductsTable';
import ProductsSidebarContent from './ProductsSidebarContent';
import { useRef } from 'react';
import ProductDialog from '../product/ProductDialog';

function Products() {
	const pageLayout = useRef(null);
	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 sm:p-24 h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					wrapper: 'min-h-0'
				}}
				header={<ProductsHeader pageLayout={pageLayout} />}
				content={<ProductsTable />}
				sidebarInner
				leftSidebarContent={<ProductsSidebarContent />}
				ref={pageLayout}
				innerScroll
			/>
			<ProductDialog />
		</>
	);
}

export default withReducer('gas', reducer)(Products);
