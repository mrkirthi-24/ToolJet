import React from 'react';
import { Link } from 'react-router-dom';
// todo: legacy package, remove this, upgrade to react-router-dom v6 https://reactrouter.com/en/main/upgrading/v5
// v6 has a official way to support breadcrumbs https://reactrouter.com/en/main/hooks/use-matches#breadcrumbs
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';

const Breadcrumbs = ({ breadcrumbs }) => {
  return (
    <ol className="breadcrumb breadcrumb-arrows">
      {breadcrumbs.map(({ breadcrumb }) => {
        return (
          <li key={breadcrumb.key} className="breadcrumb-item">
            <Link to={breadcrumb.key}>{breadcrumb}</Link>
          </li>
        );
      })}
    </ol>
  );
};
<></>;

export default withBreadcrumbs()(Breadcrumbs);
