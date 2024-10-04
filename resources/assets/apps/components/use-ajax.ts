import useSWR from 'swr';

declare global {
  interface Window {
    ajaxurl: string;
  }
}

// Assuming WPKirkMantine is a global variable, you can declare it like this:
declare const WPKirkMantine: { nonce: string };

interface PostResponse {
  // Define the structure of the response here
  [key: string]: any;
}

const post = async (action: string): Promise<PostResponse> => {
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
  return { data, error: null as any, isLoading: false };
}
