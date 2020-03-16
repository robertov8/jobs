import { Pagination } from 'react-bootstrap';
import React from 'react';

export default function IssuePagination({ paginationPage, page }) {
  return (
    <Pagination className="mt-2 justify-content-center">
      <Pagination.Prev onClick={() => paginationPage('prev')} />
      <Pagination.Item key="page" active>
        {page}
      </Pagination.Item>
      <Pagination.Next onClick={() => paginationPage('next')} />
    </Pagination>
  );
}
