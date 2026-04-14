"use client";

import { useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { saveOutfit, getOutfits, deleteOutfit } from "@/lib/firebase/firestore";

export const useOutfit = () => {
  const { user } = useAuth();
  const [savedOutfits, setSavedOutfits] = useState([]);
  const [loadingOutfits, setLoadingOutfits] = useState(false);

  const fetchOutfits = useCallback(async () => {
    if (!user) return;
    setLoadingOutfits(true);
    try {
      const data = await getOutfits(user.uid);
      setSavedOutfits(data);
    } catch (err) {
      console.error("Outfit fetch error:", err);
    } finally {
      setLoadingOutfits(false);
    }
  }, [user]);

  const save = async (outfitData) => {
    if (!user) throw new Error("Not authenticated");
    const id = await saveOutfit(user.uid, outfitData);
    const newOutfit = {
      id,
      ...outfitData,
      userId: user.uid,
      createdAt: { seconds: Math.floor(Date.now() / 1000) },
    };
    setSavedOutfits((prev) => [newOutfit, ...prev]);
    return newOutfit;
  };

  const remove = async (outfitId) => {
    await deleteOutfit(outfitId);
    setSavedOutfits((prev) => prev.filter((o) => o.id !== outfitId));
  };

  return {
    savedOutfits,
    loadingOutfits,
    fetchOutfits,
    saveOutfit: save,
    deleteOutfit: remove,
  };
};