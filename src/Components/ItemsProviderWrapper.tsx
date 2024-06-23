import React from "react";
import { ItemsProvider } from "./ItemsProvider";
import SearchBar from "./SearchBar";

interface ItemsProviderWrapperProps {
  type: "lost" | "found";
  children: React.ReactNode;
}

const ItemsProviderWrapper: React.FC<ItemsProviderWrapperProps> = ({
  type,
  children,
}) => {
  return <ItemsProvider type={type}>{children}</ItemsProvider>;
};

export default ItemsProviderWrapper;
