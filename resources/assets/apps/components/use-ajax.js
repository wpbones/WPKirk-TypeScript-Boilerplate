import useSWR from 'swr';

const post = async action => {
  const res = await fetch(window.ajaxurl, {
    method: 'POST',
    body: new URLSearchParams({
      action,
      nonce: WPKirkMantine.nonce,
    }),
    headers: {
      // form-data url encoded
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return res.json();
};

export function useAjax() {
  const { data, error, isLoading } = useSWR('logged', post);

  if (error) return { error };
  if (isLoading) return { isLoading };

  // render data
  return { data, error: null, isLoading: false };
}
