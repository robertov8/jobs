import { Pagination } from 'react-bootstrap';
import React from 'react';

export default function IssuePagination({
  paginationOptions,
  paginationActions,
  page,
}) {
  return (
    <Pagination className="mt-2 justify-content-center">
      <Pagination.First
        disabled={!paginationOptions.hasOwnProperty('first')}
        onClick={() => paginationActions('first')}
      />
      <Pagination.Prev
        disabled={!paginationOptions.hasOwnProperty('prev')}
        onClick={() => paginationActions('prev')}
      />

      <Pagination.Item key="page" active>
        {page}
      </Pagination.Item>

      <Pagination.Next
        disabled={!paginationOptions.hasOwnProperty('next')}
        onClick={() => paginationActions('next')}
      />
      <Pagination.Last
        disabled={!paginationOptions.hasOwnProperty('last')}
        onClick={() => paginationActions('last')}
      />
    </Pagination>
  );
}
