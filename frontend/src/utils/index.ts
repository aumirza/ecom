import { notFound } from "next/navigation";

export const handleFetchErrors = (res: any) => {
  switch (res.status) {
    case 404:
      return notFound();
    case 500:
      throw Error("Internal Server Error");
    default:
      if (!res.ok) throw Error(res.statusText);
      break;
  }
  return res;
};
