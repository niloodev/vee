export const getInitials = (name: string) =>
  name.trim().slice(0, 2).toUpperCase() || "OP";
