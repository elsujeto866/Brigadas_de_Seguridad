import Group from "../models/group.model.js";

export const createGroup = async (req, res) => {
  const { name, zone,date,schedule, maxMembers } = req.body;
  try {
    const newGroup = new Group({
      name,
      zone,
      date,
      schedule,
      maxMembers
    });

    const groupSaved = await newGroup.save();

    res.json(groupSaved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGroupById = async (req, res) => {
  const { id } = req.params;

  try {
    const group = await Group.findById(id);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateGroup = async (req, res) => {
  const { id } = req.params;
  const { name, zone, maxMembers } = req.body;

  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      id,
      { name, zone, maxMembers },
      { new: true }
    );

    if (!updatedGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.json(updatedGroup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteGroup = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedGroup = await Group.findByIdAndDelete(id);

    if (!deletedGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.json({ message: "Group deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función para actualizar un grupo y agregar brigadistas
export const actualizarBrigadistas = (req, res) => {
  const { id } = req.params;
  const { members } = req.body;

  Group.findOneAndUpdate(
      { _id: id },
      { $addToSet: { members: members } }, // Agregar brigadistas al array
      { new: true }
  )
  .populate('members') // Popula el array de brigadistas con los documentos completos
  .exec()
  .then(grupoActualizado => {
      if (!grupoActualizado) {
          return res.status(404).json({ message: 'No se encontró el grupo' });
      }
      res.json(grupoActualizado);
  })
  .catch(error => res.status(400).json(error));
};

//funcion para obtener los brigadistas de un grupo
/*export const getBrigadistasGroup = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.json(group.members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};*/
//Funcion para visualizar un grupo
export const getBrigadistasGroup = (request, response) => {
  Group.findOne({_id:request.params.id})
  .then(group => response.json(group.members))
  .catch(err => response.json(err))
}


