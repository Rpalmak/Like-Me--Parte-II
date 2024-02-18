import express from 'express'
import {
    getAllPosts,
    createPosts,
    addLikes,
    deletePosts
} from '../src/controllers/postsController.js'
import { validateParametersAreNotEmpty } from '../middlewares/postsMiddleware.js'
const router = express.Router()

router.get('/posts', getAllPosts)
router.post('/posts', validateParametersAreNotEmpty, createPosts)
router.put('/posts/like/:id', addLikes)
router.delete('/posts/:id', deletePosts)

export default router