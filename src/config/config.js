const config = {
    appWriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appWriteDb: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteCollection: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appWriteProject: String(import.meta.env.VITE_APPWRIE_PROJECT_ID),
    appWriteBucket: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default config;