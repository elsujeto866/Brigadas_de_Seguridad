import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    zone: {
        type: String,
        required: true,

    },
    date: { type: Date, default: Date.now },
    schedule: [{ type: mongoose.Schema.Types.ObjectId, ref: "Schedule" }],
    coordinator: { type: mongoose.Schema.Types.ObjectId, ref: 'Brigadista' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Brigadista' }],
    maxMembers: {type: Number, required: true}
    
});

export default mongoose.model('Group', groupSchema);