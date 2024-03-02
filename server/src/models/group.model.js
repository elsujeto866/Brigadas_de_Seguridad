import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    coordinator: { type: mongoose.Schema.Types.ObjectId, ref: 'Brigadista' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Brigadista' }],
    date: { type: Date, default: Date.now }
});

export default mongoose.model('Group', groupSchema);