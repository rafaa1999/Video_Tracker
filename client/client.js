import { debounce } from './debounce.js';
import { getSingleVidReq } from './getSingleVidReq.js';
import { checkValidity } from './checkValidity.js'
import API from './api.js';

const SUPER_USER_ID = '1990411';
export const state = {
  sortBy : 'newFirst',
  searchTerm : '',
  filterBy : 'all',
  userId : '',
  isSuperUser : false
}

document.addEventListener("DOMContentLoaded", function(){

  const formVidReqElm = document.getElementById('formVideoRequest');
  const sortByElm = document.querySelectorAll('[id*=sort_by_]');
  const searchBoxElm = document.getElementById('search_box');
  const filterByElms = document.querySelectorAll('[id^=filter_by_]')

  const formLoginElm = document.querySelector('.form-login');
  const appContentElm = document.querySelector('.app-content');

  API.loadAllVidReq();

  if(window.location.search){
    state.userId = new URLSearchParams(window.location.search).get('id');

    if(state.userId === SUPER_USER_ID){
      state.isSuperUser = true;
      document.querySelector('.normal-user-content').classList.add('d-none')
   }

    formLoginElm.classList.add('d-none');
    appContentElm.classList.remove('d-none');
 }

  // filter
        filterByElms.forEach(elm=>{
          elm.addEventListener('click', function(e){
            e.preventDefault();
            state.filterBy = e.target.getAttribute('id').split('_')[2];
            filterByElms.forEach(option=> option.classList.remove('active'));
            this.classList.add('active');
            API.loadAllVidReq(state.sortBy, state.searchTerm, state.filterBy);
          })
        })
  // filter

  // sort
      sortByElm.forEach(elm => {
        elm.addEventListener('click', function(e){
          e.preventDefault();
           state.sortBy = this.querySelector('input').value;
          API.loadAllVidReq(state.sortBy);

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
        API.loadAllVidReq(state.sortBy, state.searchTerm);
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
          getSingleVidReq(data, state, true);
        })
    })
  // submit


})