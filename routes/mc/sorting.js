const {complaint}=require('../../models/complaintSchema');
const {mc} = require('../../models/mcSchema')
const Joi = require('joi');

var formattedComp;
exports.sorting = async(req,res)=>{
    formattedComp=[];

    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    const corpId = await mc.findById(req.decodedData._id,{corporationId: true, _id: false});
    if(!corpId) return res.status(404).send('Something went wrong. Please Login again');

    const complaints = await complaint.find({"m_corporation.corp_id": corpId.corporationId,category:req.body.category,status:req.body.status},
        { _id:false})
    if(complaints.length == 0) return res.status(204).send();

    complaints.forEach(element=>{
        formattedComp.push({
            date: element.date.getDate()+"-"+(element.date.getMonth()+1)+"-"+element.date.getFullYear(),
            userName:element.user.userName,
            description:element.description,
            category:element.category,
            location:element.location,
            m_corporation:element.m_corporation.name,
            status:(element.status==1)?'Pending':'Completed',
            image:element.image
        })
    })
    res.send(formattedComp);
}

function validate(data){
    const schema = {
        category: Joi.string().required(),
        status: Joi.number().required()
    }
    return Joi.validate(data, schema);
}