import { PropTypeDescriptor } from "react-docgen/dist/Documentation";

export const formatType = (type?: PropTypeDescriptor): string =>
  type?.name === "union"
    ? (type.value as PropTypeDescriptor[]).map(formatType).join(" | ")
    : type?.name ?? "";