import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    brigadista: { type: mongoose.Schema.Types.ObjectId, ref: 'Brigadista' },
    date: { type: Date, default: Date.now }
});

export default mongoose.model('Attendance', attendanceSchema);