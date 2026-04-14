"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  getWardrobeItems,
  addClothingItem,
  deleteClothingItem,
  updateClothingItem,
} from "@/lib/firebase/firestore";
import { uploadClothingImage } from "@/lib/cloudinary/upload";

const WardrobeContext = createContext({});

export const WardrobeProvider = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const fetchItems = useCallback(async () => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getWardrobeItems(user.uid);
      setItems(data);
    } catch (err) {
      console.error("Firestore fetch error:", err);
      setError(err.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const addItem = async (file, metadata) => {
    if (!user) throw new Error("Not authenticated");
    const { url, publicId } = await uploadClothingImage(user.uid, file);
    const itemData = { ...metadata, imageUrl: url, publicId };
    const id = await addClothingItem(user.uid, itemData);
    // Add with a local timestamp so it sorts correctly before next fetch
    const newItem = {
      id,
      ...itemData,
      userId: user.uid,
      createdAt: { seconds: Math.floor(Date.now() / 1000) },
    };
    setItems((prev) => [newItem, ...prev]);
    return newItem;
  };

  const removeItem = async (itemId, publicId) => {
    await deleteClothingItem(itemId, publicId);
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateItem = async (itemId, updates) => {
    await updateClothingItem(itemId, updates);
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, ...updates } : i))
    );
  };

  const getByCategory = (category) =>
    items.filter((i) => i.category === category);

  return (
    <WardrobeContext.Provider
      value={{ items, loading, error, addItem, removeItem, updateItem, getByCategory, refetch: fetchItems }}
    >
      {children}
    </WardrobeContext.Provider>
  );
};

export const useWardrobe = () => {
  const ctx = useContext(WardrobeContext);
  if (!ctx) throw new Error("useWardrobe must be used within WardrobeProvider");
  return ctx;
};