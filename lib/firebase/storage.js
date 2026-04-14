import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "./config";
import { v4 as uuidv4 } from "uuid";

export const uploadClothingImage = async (userId, file) => {
  const ext = file.name.split(".").pop();
  const fileName = `${uuidv4()}.${ext}`;
  const storageRef = ref(storage, `wardrobe/${userId}/${fileName}`);

  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);

  return { url: downloadURL, path: `wardrobe/${userId}/${fileName}` };
};

export const uploadProfileImage = async (userId, file) => {
  const ext = file.name.split(".").pop();
  const storageRef = ref(storage, `profiles/${userId}/avatar.${ext}`);

  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
};

export const deleteImage = async (imagePath) => {
  const storageRef = ref(storage, imagePath);
  await deleteObject(storageRef);
};