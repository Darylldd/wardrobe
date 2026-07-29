# FihhChehh

A digital closet. Photograph the clothes you actually own, build outfits from them, or let an AI put a look together based on what's actually in your wardrobe instead of some generic style board.

Built this to get more hands-on with Next.js App Router, Firebase, and shipping something start to finish. Not trying to be the next startup, just a project I wanted to actually finish and make look decent.



## What it does

- Upload clothes and tag them: category, color, occasion, style
- Browse everything as a corkboard of polaroid-style cards, filterable by category
- Build outfits by hand, dropping pieces into slots for top, bottom, shoes, and accessories
- Describe an occasion, like "casual friday" or "first date," and get outfit suggestions pulled only from clothes you've actually uploaded
- Save outfits and pull them back up later
- Bottom tab nav on mobile instead of a squeezed-in sidebar

## Stack

- Next.js, App Router
- Firebase for Auth (email/password + Google) and Firestore
- Cloudinary for image storage
- Groq API (Llama 3.3 70B) for the AI stylist
- Tailwind CSS, react-hot-toast, lucide-react

The AI stylist originally ran on Gemini's free tier. Kept hitting a `limit: 0` error that turned out to be a regional/project quota issue on Google's end, not a bug in the code, so I switched to Groq instead. No billing required, and it's fast enough that suggestions come back in a couple seconds. It works off a plain-text summary of the wardrobe (ID, category, color, tags) rather than actual photos, and picks outfits by item ID, which keeps it from suggesting clothes that don't exist.

## Running it locally

```bash
git clone https://github.com/yourusername/wardrobe.git
cd FihhChehh
npm install
```

You'll need a `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
GROQ_API_KEY=
```

Firebase keys come from the Firebase console under project settings. The admin ones come from a service account key (Project Settings → Service Accounts → Generate new private key). Groq keys are free at console.groq.com.

```bash
npm run dev
```

## Pages

- `/` - landing page
- `/login`, `/register` - auth
- `/dashboard` - stats overview
- `/wardrobe` - the closet itself, add/browse/filter pieces
- `/outfit-builder` - slot-based outfit builder
- `/ai-stylist` - talk to the stylist

## Design

Didn't want this to look like every other wardrobe app, which all seem to land on the same clean grid of photos. Went with a "teenage bedroom corkboard" feel instead: aged paper texture, typewriter headings, handwritten labels, clothes pinned up like polaroids with little rose-colored pins. No emojis anywhere in the UI on purpose, it felt like it undercut the whole aesthetic.

## Known limitations

- The AI works off tags and text, not the actual images. Works well enough since items get tagged in decent detail on upload, but there's no real visual matching happening
- No calendar or outfit planning yet
- Groq's free tier caps at 14,400 requests a day. Way more than one person needs, but worth knowing if this ever gets shared around

## License

MIT, do what you want with it.