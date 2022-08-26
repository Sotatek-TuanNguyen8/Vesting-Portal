export function useTokenLocal(text: string) {
  const access_token = localStorage.getItem(text) as string;
  return {
    access_token,
  };
}
