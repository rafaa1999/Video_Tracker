const VideoRequest = require('./Video');
const User = require('../user/User')

module.exports = {
  createRequest: async (vidRequestData) => {
    const authorId = vidRequestData.author_id;
    if(authorId){
      const userObj = await User.findOne({_id: authorId});
      vidRequestData.author_name = userObj.author_name;
      vidRequestData.author_email = userObj.author_email;
    }
    let newRequest = new VideoRequest(vidRequestData);
    return newRequest.save();
  },

  getAllVideoRequests: () => {
    return VideoRequest.find({}).sort({ submit_date: '-1' });
  },

  searchRequests: (topic) => {
    return VideoRequest.find({ 
      topic_title: { $regex : topic , $options: 'i' }
     }).sort({ addedAt: '-1' })
  },

  getRequestById: (id) => {
    return VideoRequest.findById({ _id: id });
  },

  updateRequest: (id, status, resVideo) => {
    const updates = {
      status: status,
      video_ref: {
        link: resVideo,
        date: resVideo && new Date(),
      },
    };
    return VideoRequest.findByIdAndUpdate(id, updates, { new: true });
  },

  updateVoteForRequest: async (id, vote_type) => {
    const oldRequest = await VideoRequest.findById({ _id: id });
    const other_type = vote_type === 'ups' ? 'downs' : 'ups';
    return VideoRequest.findByIdAndUpdate(
      { _id: id },
      {
        votes: {
          [vote_type]: ++oldRequest.votes[vote_type],
          [other_type]: oldRequest.votes[other_type],
        },
      },
      {new : true}
    );
  },

  deleteRequest: (id) => {
    return VideoRequest.deleteOne({ _id: id });
  },
};