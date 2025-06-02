import useSWR from "swr";

async function fetchAPI(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Erro ao buscar o status da API");
  return response.json();
}

export default function useApiStatus() {
  return useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
    revalidateOnFocus: false,
  });
}
