const listOfVidsElm = document.getElementById('listOfRequests');
const state = {
  sortBy : 'newFirst',
  searchTerm : '',
  userId : '',
}

function getSingleVidReq(vidInfo, isPrepend="false"){
  const vidReqContainerElm = document.createElement('div');
  vidReqContainerElm.innerHTML = `

  <div class="card mb-3">
        
      <div class="card-body d-flex justify-content-between flex-row">
        <div class="d-flex flex-column">
          <h3>${vidInfo.topic_title}</h3>
          <p class="text-muted mb-2">${vidInfo.topic_details}</p>
          <p class="mb-0 text-muted">
            ${
              vidInfo.expected_result &&
              `<strong>Expected results:</strong> ${vidInfo.expected_result}`
            }
          </p>
        </div>

        <div class="d-flex flex-column text-center">
          <a id="votes_ups_${vidInfo._id}" class="btn btn-link">🔺</a>
          <h3 id="score_vote_${vidInfo._id}">${vidInfo.votes.ups - vidInfo.votes.downs}</h3>
          <a id="votes_downs_${vidInfo._id}" class="btn btn-link">🔻</a>
        </div>
      </div>
      <div class="card-footer d-flex flex-row justify-content-between">
        <div>
          <span>${vidInfo.status.toUpperCase()}</span>
          &bullet; added by <strong>${vidInfo.author_name}</strong> on
          <strong>${new Date(vidInfo.submit_date).toLocaleDateString()}</strong>
        </div>
        <div
          class="d-flex justify-content-center flex-column 408ml-auto mr-2"
        >
          <div class="badge badge-success">
          ${vidInfo.target_level}
          </div>
        </div>
      </div>
  </div>
  `;

  if(isPrepend){
    listOfVidsElm.prepend(vidReqContainerElm)
  }else{
    listOfVidsElm.appendChild(vidReqContainerElm);
  }

  const scoreVote = document.getElementById(`score_vote_${vidInfo._id}`);
  const votesElms = document.querySelectorAll(`[id^=votes_][id$=_${vidInfo._id}]`);

  votesElms.forEach(elm =>{
    elm.addEventListener('click', function(e){
      e.preventDefault();
      const [, vote_type, id] = e.target.getAttribute('id').split('_');
      fetch('http://localhost:3000/video-request/vote', {
        method: 'PUT',
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify({ id , vote_type})
      }).then(blob => blob.json())
      .then(data => {
        scoreVote.innerHTML = data.votes.ups - data.votes.downs;
      })
    })
  })

}

function loadAllVidReq(sortBy = 'newFirst', searchTerm = ''){
  fetch(`http://localhost:3000/video-request?sortBy=${sortBy}&searchTerm=${searchTerm}`)
  .then(bold=>bold.json())
  .then(data=>{
    listOfVidsElm.innerHTML = '';
    data.forEach(vidInfo => {
      getSingleVidReq(vidInfo)
    });
  });
};

function debounce(fn, time){
  let timeout;

  return function(...args){
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), time)

  }
}

function checkValidity(formData){
  
  // const name = formData.get('author_name');
  // const email = formData.get('author_email');
  const topic = formData.get('topic_title');
  const topicDetails = formData.get('topic_details');

  // if(!name){
  //   document.querySelector('[name=author_name]').classList.add('is-invalid')
  // }

  // const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  // if(!email || !emailPattern.test(email) ){
  //   document.querySelector('[name=author_email]').classList.add('is-invalid')
  //  }
  
  if(!topic || topic.length > 30){
    document.querySelector('[name=topic_title]').classList.add('is-invalid')
  }

  if(!topicDetails){
    document.querySelector('[name=topic_details]').classList.add('is-invalid')
  }

  const allInvalidElms = document.getElementById('formVideoRequest').querySelectorAll('.is-invalid')

  if(allInvalidElms.length){
    allInvalidElms.forEach(elm=>{
      elm.addEventListener('input', function(){
        this.classList.remove('is-invalid')
      })
    })
    return false;
  }
  return true;
}

document.addEventListener("DOMContentLoaded", function(){

  const formVidReqElm = document.getElementById('formVideoRequest');
  const sortByElm = document.querySelectorAll('[id*=sort_by_]');
  const searchBoxElm = document.getElementById('search_box');

  const formLoginElm = document.querySelector('.form-login');
  const appContentElm = document.querySelector('.app-content');

  loadAllVidReq();

  if(window.location.search){
    state.userId = new URLSearchParams(window.location.search).get('id');
    formLoginElm.classList.add('d-none');
    appContentElm.classList.remove('d-none');
 }

  // sort
      sortByElm.forEach(elm => {
        elm.addEventListener('click', function(e){
          e.preventDefault();
           state.sortBy = this.querySelector('input').value;
          loadAllVidReq(state.sortBy);

          this.classList.add('active');
          if(state.sortBy === 'topVotedFirst'){
            document.getElementById('sort_by_new').classList.remove('active');
          }else{
            document.getElementById('sort_by_top').classList.remove('active');
          }

        }) 
      })
  // sort

  // search
      searchBoxElm.addEventListener('input',
      debounce((e)=>{
        state.searchTerm = e.target.value;
        loadAllVidReq(state.sortBy, state.searchTerm);
      },300)
      );
  // search


  // submit
      formVidReqElm.addEventListener('submit',(e)=>{
        e.preventDefault(); 

        const formData = new FormData(formVidReqElm);
        formData.append('author_id',state.userId)
        const isValid = checkValidity(formData);

        if(!isValid) return;

        fetch('http://localhost:3000/video-request',{
          method:"POST",
          body: formData,
        }).then((bold) => bold.json())
        .then((data)=>{
          console.log(data);
          getSingleVidReq(data, true);
        })
    })
  // submit


})