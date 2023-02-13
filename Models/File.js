const mongoose=require('mongoose');

const FileSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'users',require:true},
    filePath:{type:String},
    fileName:{type:String},
    createdAt: { type: Date, immutable: true, default: () => new Date() },
    updatedAt: { type: Date, default: new Date() }
})

module.exports=mongoose.model('files',FileSchema);