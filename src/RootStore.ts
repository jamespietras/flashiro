import {configure} from 'mobx';

import DashboardStore from '@flashiro/modules/Dashboard/DashboardStore';

configure({computedRequiresReaction: true, enforceActions: 'strict'});

export class RootStore {
  public dashboardStore: DashboardStore;

  constructor() {
    this.dashboardStore = new DashboardStore();
  }
}

export default new RootStore();
