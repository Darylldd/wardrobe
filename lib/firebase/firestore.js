import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";
import { deleteImage } from "@/lib/cloudinary/upload";

// --- Wardrobe Items ---
export const addClothingItem = async (userId, itemData) => {
  const ref = await addDoc(collection(db, "wardrobe"), {
    ...itemData,
    userId,
    createdAt: serverTimestamp(),
  });
  return ref.id;
};

export const getWardrobeItems = async (userId) => {
  const q = query(
    collection(db, "wardrobe"),
    where("userId", "==", userId)
  );
  const snap = await getDocs(q);
  const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  // Sort client-side to avoid needing a Firestore composite index
  return items.sort((a, b) => {
    const aTime = a.createdAt?.seconds ?? 0;
    const bTime = b.createdAt?.seconds ?? 0;
    return bTime - aTime;
  });
};

export const deleteClothingItem = async (itemId, publicId) => {
  if (publicId) {
    await deleteImage(publicId);
  }
  await deleteDoc(doc(db, "wardrobe", itemId));
};

export const updateClothingItem = async (itemId, updates) => {
  await updateDoc(doc(db, "wardrobe", itemId), updates);
};

// --- Saved Outfits ---
export const saveOutfit = async (userId, outfitData) => {
  const ref = await addDoc(collection(db, "outfits"), {
    ...outfitData,
    userId,
    createdAt: serverTimestamp(),
  });
  return ref.id;
};

export const getOutfits = async (userId) => {
  const q = query(
    collection(db, "outfits"),
    where("userId", "==", userId)
  );
  const snap = await getDocs(q);
  const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  return items.sort((a, b) => {
    const aTime = a.createdAt?.seconds ?? 0;
    const bTime = b.createdAt?.seconds ?? 0;
    return bTime - aTime;
  });
};

export const getRecentOutfits = async (userId, count = 5) => {
  const outfits = await getOutfits(userId);
  return outfits.slice(0, count);
};

export const deleteOutfit = async (outfitId) => {
  await deleteDoc(doc(db, "outfits", outfitId));
};

// --- User Profile ---
export const getUserProfile = async (userId) => {
  const snap = await getDoc(doc(db, "users", userId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

export const updateUserProfile = async (userId, updates) => {
  await updateDoc(doc(db, "users", userId), updates);
};