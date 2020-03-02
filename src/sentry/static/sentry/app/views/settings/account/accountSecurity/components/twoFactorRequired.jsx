import React from 'react';
import styled from '@emotion/styled';

import {tct} from 'app/locale';
import Alert from 'app/components/alert';
import Link from 'app/components/links/link';
import space from 'app/styles/space';
import getPendingInvite from 'app/utils/getPendingInvite';

const TwoFactorRequired = () =>
  !getPendingInvite() ? null : (
    <StyledAlert data-test-id="require-2fa" type="error" icon="icon-circle-exclamation">
      {tct(
        'You have been invited to an organization that requires [link:two-factor authentication].' +
          ' Setup two-factor authentication below to join your organization.',
        {
          link: <Link to="https://docs.sentry.io/accounts/require-2fa/" external />,
        }
      )}
    </StyledAlert>
  );

const StyledAlert = styled(Alert)`
  margin: ${space(3)} 0;
`;

export default TwoFactorRequired;
