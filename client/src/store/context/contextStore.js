import React, { useState } from "react";

export const StoreContext = React.createContext(null);

export default function ({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = React.useState("1");

  const showModal = (e, key = "1") => {
    setIsModalOpen(true);
    setActiveTab(key);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const store = {
    isModalOpen,
    setIsModalOpen,
    activeTab,
    setActiveTab,
    showModal,
    handleCancel,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
