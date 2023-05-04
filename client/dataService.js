import { getSingleVidReq } from './getSingleVidReq.js';
import { state } from './client.js';
import { applyVoteStyle } from './applyVoteStyle.js'
import api  from './server/api.js';

export default {
  addVidReq : (formData) => {
    return api.videoReq.post(formData)
  },

  deleteVideoReq : (id) => {
    return api.videoReq.delete(id)
      .then((_)=>{
        window.location.reload()
      })
  },

  updateVideoStatus: (id, status, resVideo = '') => {
     api.videoReq.update(id, status, resVideo)
      .then((_)=>{
      window.location.reload()
    })  
  },

  loadAllVidReq: (sortBy = 'newFirst', searchTerm = '', filterBy = 'all', LocalState = state) => {
     api.videoReq.get(sortBy, searchTerm, filterBy).then((data)=>{
      const listOfVidsElm = document.getElementById('listOfRequests');
      listOfVidsElm.innerHTML = '';
        data.forEach(vidInfo => {
          getSingleVidReq(vidInfo, LocalState)
        });
   });
  },

  updateVotes: (id, vote_type , user_id, isDone, state) => {
    return api.votes.update(id, vote_type ,user_id)
    .then(data => {
      // console.log(data)
      const scoreVote = document.getElementById(`score_vote_${id}`);
      scoreVote.innerText = data.votes.ups.length - data.votes.downs.length ;
      applyVoteStyle(id, data, state, isDone, vote_type)
    })
  }
  
}