import { useQuery } from "react-query";

export const fetchDetail = async (url) => {
  const rep = await fetch(process.env.REACT_APP_API_BASE_URL + url);
  if (!rep.ok) throw new Error(`fetching ${ url } was not ok. Return status:${ rep.status }`);
  return rep.json();
};


export function Fetch({ url, children }) {
  const { data, isLoading: loading, error } =
    useQuery({
      queryKey: ['fetchDetail', url],
      queryFn: () => fetchDetail(url),
      retry: 0,
    });

  return children(data, loading, error);
}