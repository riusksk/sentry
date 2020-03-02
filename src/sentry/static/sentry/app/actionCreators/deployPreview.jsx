import React from 'react';

import {DEPLOY_PREVIEW_CONFIG} from 'app/constants';
import {t, tct} from 'app/locale';
import AlertActions from 'app/actions/alertActions';
import Link from 'app/components/links/link';

export function displayDeployPreviewAlert() {
  if (!DEPLOY_PREVIEW_CONFIG) {
    return;
  }

  const {commitRef, reviewId, repoUrl} = DEPLOY_PREVIEW_CONFIG;
  const repoName = repoUrl.match(/\w+\/\w+\/?$/)[0];

  const pullLink = (
    <Link to={`${repoUrl}/pull/${reviewId}`} external>
      {t('%s#%s', repoName, reviewId)}
    </Link>
  );

  const sha = (
    <Link to={`${repoUrl}/commit/${commitRef}`} external>
      @{commitRef.slice(0, 6)}
    </Link>
  );

  AlertActions.addAlert({
    message: tct('You are viewing a frontend deploy preview of [pullLink] ([sha])', {
      pullLink,
      sha,
    }),
    type: 'info',
    neverExpire: true,
  });
}
