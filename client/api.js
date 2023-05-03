import { getSingleVidReq } from './getSingleVidReq.js'
import { state } from './client.js'

export default {
  updateVideoStatus: (id, status, resVideo = '') => {
    fetch('http://localhost:3000/video-request',{
      method: "PUT",
      headers: {'content-type' : 'application/json'},
      body: JSON.stringify({id, status, resVideo})
    })
    .then(res=>res.json())
    .then(data=>{
      window.location.reload()
    })  
  },

  loadAllVidReq: (sortBy = 'newFirst', searchTerm = '', filterBy = 'all', LocalState = state) => {
  const listOfVidsElm = document.getElementById('listOfRequests');
  fetch(`http://localhost:3000/video-request?sortBy=${sortBy}&searchTerm=${searchTerm}&filterBy=${filterBy}`)
  .then(bold=>bold.json())
  .then(data=>{
    listOfVidsElm.innerHTML = '';
    data.forEach(vidInfo => {
      getSingleVidReq(vidInfo, LocalState)
     });
   });
  }
  
}