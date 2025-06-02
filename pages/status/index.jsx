import React from "react";
import useApiStatus from "../../hooks/useAPIStatus";
import ApiStatusDisplay from "../../components/ApiStatusDisplay";

export default function StatusPage() {
  const { data, error, isLoading } = useApiStatus();

  return (
    <>
      <h1>Status da API</h1>
      <ApiStatusDisplay data={data} error={error} isLoading={isLoading} />
    </>
  );
}
