const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const VideoRequestData = require('./VideoService');
const multer = require('multer');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) =>
  res.send('Welcome to video_tracker project')
);

const upload = multer();

router.post('/video-request', upload.none(), async (req, res, next) => {
  const response = await VideoRequestData.createRequest(req.body);
  res.send(response);
  next();
});

router.get('/video-request', async (req, res, next) => {
  const { sortBy, searchTerm, filterBy } = req.query;
  let data;
  if(searchTerm){
    data = await VideoRequestData.searchRequests(searchTerm, filterBy);
  }else{
    data = await VideoRequestData.getAllVideoRequests(filterBy);
  }
  if( sortBy === 'topVotedFirst'){
    data =  data.sort((prev, next)=>{
       if(
         prev.votes.ups - prev.votes.downs > 
         next.votes.ups - next.votes.downs
         ){
         return 1;
         }else{
           return -1;
         }
     })
 
   }
  res.send(data);
  next();
});

router.use(express.json());

router.put('/video-request/vote', async (req, res, next) => {
  const { id, vote_type, user_id } = req.body;
  const response = await VideoRequestData.updateVoteForRequest(id, vote_type, user_id);
  res.send(response);
  next();
});

router.put('/video-request', async (req, res, next) => {
  const { id, status, resVideo } = req.body;

  const response = await VideoRequestData.updateRequest(id, status, resVideo);
  console.log(response)
  res.send(response);
  next();
});

router.delete('/video-request', async (req, res, next) => {
  const response = await VideoRequestData.deleteRequest(req.body.id);
  res.send(response);
  next();
});

module.exports = router;