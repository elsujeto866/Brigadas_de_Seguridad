import Group from '../models/group.model.js';

export const getGroups = async (req, res) => {
    try {
        const groups = await Group.find();
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getGroup = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);
        if (group == null) {
            return res.status(404).json({ message: 'Cannot find group' });
        }
        res.group = group;
        res.status(200).json(res.group);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createGroup = async (req, res) => {
    const {name} = req.body;
    const group = new Group({
        name: name
    });

    try {
        const newGroup = await group.save();
        res.status(201).json(newGroup);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateGroup = async (req, res) => {
    try {
        const updatedGroup = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedGroup);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteGroup = async (req, res) => {
    try {
        await Group.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Deleted Group' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};