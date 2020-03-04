import {RouteComponentProps} from 'react-router/lib/Router';

import {Organization} from 'app/types';

export type OrganizationSecurityAndPrivacyProps = {
  organization: Organization;
  params: {
    orgId: string;
    projectId: string;
  };
} & RouteComponentProps<{}, {}>;
