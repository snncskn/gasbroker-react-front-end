import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import { getVehicles, selectVehicles } from '../store/vehiclesSlice';
import VehiclesTableHead from './VehiclesTableHead';

function VehiclesTable(props) {
	const dispatch = useDispatch();
	const vehicles = useSelector(selectVehicles);
	const searchText = useSelector(({ gas }) => gas.vehicles.searchText);

	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(vehicles);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		dispatch(getVehicles()).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		if (searchText.length !== 0) {
			setData(_.filter(vehicles, item => item.name.toLowerCase().includes(searchText.toLowerCase())));
			setPage(0);
		} else {
			setData(vehicles);
		}
	}, [vehicles, searchText]);

	function handleRequestSort(event, property) {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item) {
		props.history.push(`/vehicle/${item.id}`);
	}

	function handleCheck(event, id) {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	}

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (data.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There are no vehicles!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<VehiclesTableHead
						selectedVehicleIds={selected}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={data.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{_.orderBy(
							data,
							[
								o => {
									switch (order.id) {
										case 'categories': {
											return o.categories[0];
										}
										default: {
											return o[order.id];
										}
									}
								}
							],
							[order.direction]
						)
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map(n => {
								const isSelected = selected.indexOf(n.id) !== -1;
								return (
									<TableRow
										className="h-72 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={n.id}
										selected={isSelected}
										onClick={event => handleClick(n)}
									>
										<TableCell className="w-40 md:w-64 text-center" padding="none">
											<Checkbox
												checked={isSelected}
												onClick={event => event.stopPropagation()}
												onChange={event => handleCheck(event, n.id)}
											/>
										</TableCell>


										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.name}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.type}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.company.full_name}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.registered_date}
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<TablePagination
				className="flex-shrink-0 border-t-1"
				component="div"
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page'
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page'
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</div>
	);
}

export default withRouter(VehiclesTable);
