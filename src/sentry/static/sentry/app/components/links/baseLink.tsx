import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-named-default
import {default as RouterLink} from 'react-router/lib/Link';
import {Location, LocationDescriptor} from 'history';

type ToLocationFunction = (location: Location) => LocationDescriptor;

export type BaseLinkProps<T extends boolean = false> = {
  to: T extends true ? string : ToLocationFunction | LocationDescriptor;
  external?: T;
  className?: string;
  blank?: boolean;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const BaseLink = <T extends boolean>({
  to,
  external,
  blank = true,
  ...props
}: BaseLinkProps<T>) =>
  external && typeof to === 'string' ? (
    <a
      href={to}
      target={blank ? '_blank' : '_self'}
      rel="noopener noreferrer"
      {...props}
    />
  ) : (
    <RouterLink to={to} {...props} />
  );

BaseLink.propTypes = {
  to: PropTypes.any.isRequired,
  external: PropTypes.bool,
  className: PropTypes.string,
  blank: PropTypes.bool,
  children: PropTypes.any,
  onClick: PropTypes.func,
};

export default BaseLink;
