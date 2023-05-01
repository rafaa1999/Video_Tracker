const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const VideoRequestData = require('./VideoService');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) =>
  res.send('Welcome to video_tracker project')
);

router.post('/video-request', async (req, res, next) => {
  const response = await VideoRequestData.createRequest(req.body);
  res.send(response);
  next();
});

router.get('/video-request', async (req, res, next) => {
  const { sortBy, searchTerm } = req.query;
  let data;
  if(searchTerm){
    data = await VideoRequestData.searchRequests(searchTerm)
  }else{
    data = await VideoRequestData.getAllVideoRequests();
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
  const { id, vote_type } = req.body;
  const response = await VideoRequestData.updateVoteForRequest(id, vote_type);
  res.send(response);
  next();
});

router.put('/video-request', async (req, res, next) => {
  const { id, status, resVideo } = req.body;

  const response = await VideoRequestData.updateRequest(id, status, resVideo);
  res.send(response);
  next();
});

router.delete('/video-request', async (req, res, next) => {
  const response = await VideoRequestData.deleteRequest(req.body.id);
  res.send(response);
  next();
});

module.exports = router;