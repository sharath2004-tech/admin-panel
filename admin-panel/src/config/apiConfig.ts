type HeaderType = "FormData" | "Json";
interface Props {
  type: HeaderType;
  token: string | null;
}
export const getHeaders = ({ type, token }: Props) => {
  if (type === "FormData") {
    return {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };
  } else {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };
  }
};
