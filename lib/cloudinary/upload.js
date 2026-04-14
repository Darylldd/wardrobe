const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

/**
 * Upload a clothing image to Cloudinary (unsigned, client-side safe)
 * Returns { url, publicId }
 */
export const uploadClothingImage = async (userId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", `outfit-matcher/${userId}/wardrobe`);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) throw new Error("Image upload failed");

  const data = await res.json();
  return {
    url: data.secure_url,
    publicId: data.public_id,
  };
};

/**
 * Upload a profile avatar to Cloudinary
 * Returns the secure URL string
 */
export const uploadProfileImage = async (userId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", `outfit-matcher/${userId}/profile`);
  formData.append("public_id", "avatar");
  formData.append("overwrite", "true");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) throw new Error("Profile image upload failed");

  const data = await res.json();
  return data.secure_url;
};

/**
 * Delete an image by publicId — must go through your own API route
 * since it requires the API secret (never expose on client)
 */
export const deleteImage = async (publicId) => {
  const res = await fetch("/api/cloudinary/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ publicId }),
  });

  if (!res.ok) throw new Error("Image deletion failed");
  return res.json();
};