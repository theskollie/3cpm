import React from "react";

import { Button } from '@material-ui/core';
import SyncIcon from '@material-ui/icons/Sync';

import { useGlobalData } from '@/app/Context/DataContext';
import ToastNotifcation from '@/app/Components/ToastNotification'

interface Type_ButtonProps {
    style?: object,
    className?: string
}
const UpdateDataButton = ({ style, className }: Type_ButtonProps) => {

    const state = useGlobalData()
    const { data: { metricsData, isSyncing }, actions: { updateAllData } } = state

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event: any, reason: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return (
        <>
            <Button
                // variant="contained"
                // color="primary"
                className={className}
                onClick={async () => {
                    await updateAllData()
                    handleClick()
                }}
                disableElevation
                endIcon={<SyncIcon className={isSyncing ? "iconSpinning" : ""} />}
                style={style}
            >
                Update Data
            </Button>
            <ToastNotifcation open={open} handleClose={handleClose} message="Sync finished." />
        </>
    )
}

export default UpdateDataButton;