import FusePageCarded from "@fuse/core/FusePageCarded";
import { motion } from "framer-motion";
import Typography from '@material-ui/core/Typography';
import { Link, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { useEffect, useState } from 'react';


function UserForm(){
    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}


    return(
        <FusePageCarded 
        classes={{
            content: 'flex',
            header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
        }}
        header={
            (
                <div className="flex flex-1 w-full items-center justify-between">
                    <div className="flex flex-1 flex-col items-center sm:items-start">
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
                        >
                            <Typography
                                className="flex items-center sm:mb-12"
                                component={Link}
                                role="button"
                                to="/apps/e-commerce/orders"
                                color="inherit"
                            >
                                <Icon className="text-20">
                                    {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                                </Icon>
                                <span className="mx-4 font-medium">Orders</span>
                            </Typography>
                        </motion.div>

                        <div className="flex flex-col min-w-0 items-center sm:items-start">
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
                            >
                                <Typography className="text-16 sm:text-20 truncate font-semibold">
                                   New User
                                </Typography>
                                <Typography variant="caption" className="font-medium">
                                  Detail informataion
                                </Typography>
                            </motion.div>
                        </div>
                    </div>
                </div>
            )
        }
        contentToolbar={
            <Tabs
                value={tabValue}
                onChange={handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                classes={{ root: 'w-full h-64' }}
            >
                <Tab className="h-64" label="Order Details" />
                <Tab className="h-64" label="Products" />
                <Tab className="h-64" label="Invoice" />
            </Tabs>
        }
        content={
            (
                <div className="p-16 sm:p-24 max-w-2xl w-full">
                    {tabValue === 0 && <div>order dtadasd</div>}
                    {tabValue === 1 && <div>order dtadasd</div>}
                    {tabValue === 2 && <div>order dtadasd</div>}
                </div>
            )
        }
        innerScroll
    />
    )
}

export default UserForm;