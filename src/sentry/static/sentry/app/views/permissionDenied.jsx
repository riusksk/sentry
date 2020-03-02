import {withRouter} from 'react-router';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import React from 'react';
import * as Sentry from '@sentry/browser';

import {t, tct} from 'app/locale';
import Link from 'app/components/links/link';
import LoadingError from 'app/components/loadingError';
import getRouteStringFromRoutes from 'app/utils/getRouteStringFromRoutes';

const ERROR_NAME = 'Permission Denied';

class PermissionDenied extends React.Component {
  static propTypes = {
    routes: PropTypes.array,
  };

  static contextTypes = {
    organization: PropTypes.object,
    project: PropTypes.object,
  };

  componentDidMount() {
    const {routes} = this.props;
    const {organization, project} = this.context;

    const route = getRouteStringFromRoutes(routes);
    Sentry.withScope(scope => {
      scope.setFingerprint([ERROR_NAME, route]);
      scope.setExtra('route', route);
      scope.setExtra('orgFeatures', (organization && organization.features) || []);
      scope.setExtra('orgAccess', (organization && organization.access) || []);
      scope.setExtra('projectFeatures', (project && project.features) || []);
      Sentry.captureException(new Error(`${ERROR_NAME}${route ? ` : ${route}` : ''}`));
    });
  }

  render() {
    return (
      <DocumentTitle title={t('Permission Denied')}>
        <LoadingError
          message={tct(
            'Your role does not have the necessary permissions to access this resource, please read more about [link:organizational roles]',
            {
              link: <Link to="https://docs.sentry.io/learn/membership/" external />,
            }
          )}
        />
      </DocumentTitle>
    );
  }
}

export default withRouter(PermissionDenied);
