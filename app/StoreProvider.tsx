"use client";
import { Provider } from "react-redux";
import { store } from "../store/store"; // Store is already an instance

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
