export const getInitials = (name: string) =>
  name.trim().slice(0, 2).toUpperCase() || "OP";

export const generateMcpKey = () => {
  const hex = "0123456789abcdef";
  let key = "";
  for (let index = 0; index < 32; index += 1) {
    key += hex[Math.floor(Math.random() * 16)];
  }
  return `vee_sk_${key}`;
};
