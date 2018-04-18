import {observer} from 'mobx-react';
import * as React from 'react';

import rootStore from '@flashiro/RootStore';

function Dashboard() {
  return (
    <div>
      Dashboard of {rootStore.dashboardStore.userFullName}
    </div>
  );
}

export default observer(Dashboard);
