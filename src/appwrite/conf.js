import config from "../config/config";
import { Client, ID, Databases, Storage, Query, Account } from 'appwrite'

export class Service {
    client = new Client();
    databases;
    bucket;     
    constructor() {
        this.client.setEndpoint(config.appWriteUrl)
        this.client.setProject(config.appWriteProject)
        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, img, status, userId }) {
        try {
            return await this.databases.createDocument(
                    config.appWriteDb,
                    config.appWriteCollection,
                slug,
                {
                    title,
                    content,
                    img,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log(error);
        }
    }
    async updatePost(slug, { title, content, img, status }) {
        try {
            return await this.databases.updateDocument(
                config.appWriteDb,
                config.appWriteCollection,
                slug,
                {
                    title,
                    content,
                    img,
                    status,
                }
            )
        } catch (error) {
            console.log(error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appWriteDb,
                config.appWriteCollection,
                slug
            )
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appWriteDb,
                config.appWriteCollection,
                slug
            )
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async getPosts(queries = [Query.equal('status', 'active'),]) {
        try {
            return await this.databases.listDocuments(
                config.appWriteDb,
                config.appWriteCollection,
                queries,
            )
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async uplodeFile(file) {
        try {
            return await this.bucket.createFile(
                config.appWriteBucket,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appWriteBucket,
                fileId
            )
            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getFilePreview(fileId){
        console.log(fileId);
        try {
            return  this.bucket.getFilePreview(
                config.appWriteBucket,
                fileId
            )

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

const service = new Service();
export default service;