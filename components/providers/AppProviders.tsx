"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "@/store";

export interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: "#0f172a",
            color: "#f8fafc",
            border: "1px solid #1e293b",
            borderRadius: "0.75rem",
            fontSize: "0.875rem",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)",
          },
          success: {
            iconTheme: {
              primary: "#3b82f6",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#f43f5e",
              secondary: "#ffffff",
            },
          },
        }}
      />
    </Provider>
  );
};
