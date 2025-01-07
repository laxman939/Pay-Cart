"use client";

import { useEffect } from "react";

const VisibilityHandler = () => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Missing you! Come back soon 👋";
      } else {
        document.title = "Pay Cart";
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    // Disable key combinations for opening DevTools (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U)
    const disableDevToolsKeys = (e: any) => {
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
        (e.ctrlKey && e.keyCode === 85) // Ctrl+U (View source)
      ) {
        e.preventDefault();
      }
    };

    // Disable right-click context menu
    const disableRightClick = (e: any) => e.preventDefault();

    // Attach event listeners
    document.addEventListener("keydown", disableDevToolsKeys);
    document.addEventListener("contextmenu", disableRightClick);

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener("keydown", disableDevToolsKeys);
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  return null;
};

export default VisibilityHandler;
