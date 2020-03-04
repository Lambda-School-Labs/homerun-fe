import React from 'react';

import AccountSettings from './AccountSettings.js';
import Notifications from './Notifications.js';
import PinNumber from './PinNumber.js';

import { Header as UiHeader } from 'semantic-ui-react';

const Header = () => {
    
    return (
        <div>
            <PinNumber />
            <UiHeader as='h2'>Setup Household</UiHeader>
            <AccountSettings />
        </div>
    )
}

export default Header;