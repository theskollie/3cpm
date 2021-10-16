import { useAppSelector } from '@/app/redux/hooks';
import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useState } from "react";
import { updateNotificationsSettingsGlobal } from '../../../redux/configActions';

/**
 * 
 * @returns Checkboxes for configuring the state of auto sync.
 */
const NotificationsSettings = () => {

    const { config } = useAppSelector(state => state.config);

    const [summary, setSummary] = useState(() => config.globalSettings.notifications.summary)
    const [enabled, setEnabled] = useState(() => config.globalSettings.notifications.enabled)

    const changeSummary = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked
        updateNotificationsSettingsGlobal({ summary: checked })
        setSummary(checked)
    }

    const changeEnabled = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked
        updateNotificationsSettingsGlobal({ enabled: checked })
        setEnabled(checked)
    }

    return (
        <div className="notificationsSettings">
            <FormControlLabel
                control={
                    <Checkbox
                        checked={enabled}
                        onChange={changeEnabled}
                        name="notifications"
                        color="primary"
                        style={{ color: 'var(--color-secondary)' }}

                    />
                }
                label="Enable Notifications"

            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={summary}
                        onChange={changeSummary}
                        name="summary"
                        style={{ color: 'var(--color-secondary)' }}

                    />
                }
                label="Summarize Notifications"
            />


        </div>
    )
}

export default NotificationsSettings;
