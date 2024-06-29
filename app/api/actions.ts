"use server";

export const request = async (input: RequestInfo | URL, init?: RequestInit) => {
  const res = await fetch(input, init);

  const headers: Record<string, any> = {};
  res.headers.forEach((val, key) => {
    headers[key.toLowerCase()] = val;
  });

  return {
    text: await res.text(),
    headers,
    status: res.status,
    statusText: res.statusText,
  };
};
