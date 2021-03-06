const express = require('express');
const tagsRouter = express.Router();
const { getPostsByTagName } = require('../db');

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    // read the tagname from the params
   let {tagName} = req.params;
     tagName = decodeURIComponent(tagName)
     
    try {
        const postedTags = await getPostsByTagName(tagName);

        res.send({postedTags})
        
    
      // use our method to get posts by tag name from the db
      // send out an object to the client { posts: // the posts }
    } catch  ({ name, message }) {
        next(
            {name, message}
        )
      // forward the name and message to the error handler
    }
  });

module.exports = tagsRouter;