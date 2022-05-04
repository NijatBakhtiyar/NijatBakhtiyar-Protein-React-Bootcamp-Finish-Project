import React from "react";

export function AsyncList({
  query,
  renderLoading,
  renderError,
  renderList,
  renderEmpty,
}) {
  return (
    <>
      {query.isLoading && renderLoading()}
      {query.isError && renderError(query.error)}
      {query.isSuccess && query.data.length
        ? renderList(query.data)
        : renderEmpty()}
    </>
  );
}
