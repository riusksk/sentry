import React from 'react';
import PropTypes from 'prop-types';

import {t} from 'app/locale';
import SettingsPageHeader from 'app/views/settings/components/settingsPageHeader';
import JsonForm from 'app/views/settings/components/forms/jsonForm';
import Form from 'app/views/settings/components/forms/form';
import AsyncView from 'app/views/asyncView';
import {GetEndPointsOutput} from 'app/components/asyncComponent';
import {Organization} from 'app/types';
import {addErrorMessage} from 'app/actionCreators/indicator';
import {updateOrganization} from 'app/actionCreators/organizations';
import organizationSecurityAndPrivacy from 'app/data/forms/organizationSecurityAndPrivacy';

import {OrganizationSecurityAndPrivacyProps} from './types';

class OrganizationSecurityAndPrivacyContent extends AsyncView<
  OrganizationSecurityAndPrivacyProps
> {
  static contextTypes = {
    organization: PropTypes.object.isRequired,
    router: PropTypes.object,
  };

  getEndpoints(): GetEndPointsOutput {
    const {orgId} = this.props.params;
    return [['authProvider', `/organizations/${orgId}/auth-provider/`]];
  }

  handleSave = (data: Organization) => {
    // This will update OrganizationStore (as well as OrganizationsStore
    // which is slightly incorrect because it has summaries vs a detailed org)
    updateOrganization(data);
  };

  renderBody() {
    const {organization} = this.context;
    const {orgId} = this.props.params;
    const {authProvider} = this.state;
    const initialData = this.props.organization;
    const endpoint = `/organizations/${orgId}/`;
    const access = new Set(organization.access);
    const features = new Set(organization.features);

    return (
      <React.Fragment>
        <SettingsPageHeader title={t('Security & Privacy')} />
        <Form
          className="organization-settings-security-and-privacy"
          apiMethod="PUT"
          apiEndpoint={endpoint}
          initialData={initialData}
          additionalFieldProps={{hasSsoEnabled: !!authProvider}}
          onSubmitSuccess={(_resp, model) => {
            this.handleSave(model.initialData as Organization);
          }}
          onSubmitError={() => addErrorMessage('Unable to save change')}
          saveOnBlur
          allowUndo
        >
          <JsonForm
            features={features}
            forms={organizationSecurityAndPrivacy}
            disabled={!access.has('org:write')}
          />
        </Form>
      </React.Fragment>
    );
  }
}

export default OrganizationSecurityAndPrivacyContent;
