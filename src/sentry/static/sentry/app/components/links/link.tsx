import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-named-default
import {default as RouterLink} from 'react-router/lib/Link';
import {Location, LocationDescriptor} from 'history';

type ToLocationFunction = (location: Location) => LocationDescriptor;

export type LinkProps = {
  to?: string | ToLocationFunction | LocationDescriptor;
  external?: boolean;
  className?: string;
  blank?: boolean;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const Link = ({to = '#', external, blank = true, ...props}: LinkProps) =>
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

Link.propTypes = {
  to: PropTypes.any,
  external: PropTypes.bool,
  className: PropTypes.string,
  blank: PropTypes.bool,
  children: PropTypes.any,
  onClick: PropTypes.func,
};

export default Link;
