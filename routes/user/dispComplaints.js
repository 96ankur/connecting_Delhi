const {complaint} = require('../../models/complaintSchema');
const {user} = require('../../models/userSchema');

var formattedComp;

exports.dispComplaints = async (req, res) => {
  formattedComp = [];
  let complaints = {};

  userDetail = await user.findById(req.decodedData._id, {
    userName: true,
    _id: false
  });

  if (req.body.type == 'personal') { // personal will display complaints that belongs to a user
    complaints = await complaint.find({
        'user.id': req.decodedData._id
      })
      // .cache({
      //   key: req.decodedData._id
      // })
    if (complaints.length == 0) return res.status(204).send();
  } else {
    complaints = await complaint.find();
    if (complaints.length == 0) return res.status(204).send();
  }

  let filteredComplaints = complaints.map((i) => {
    return {
      date: i.date.getDate() + "-" + (i.date.getMonth() + 1) + "-" + i.date.getFullYear(),
      userName: userDetail.userName,
      description: i.description,
      category: i.category,
      location: i.location,
      m_corporation: i.m_corporation.corp_id,
      status: (i.status == 1) ? 'Pending' : 'Completed',
      image: i.image
    }
  });

  res.send(filteredComplaints);
}
