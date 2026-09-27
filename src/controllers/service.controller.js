const {
  createService,
  getuserServices,
  getserviceById,
  updateService,
  deleteService
} = require("../services/service.service");
const addService = async (req, res) => {
  try {
    const { name, url, checkInterval } = req.body;

    if (!name || !url) {
      return res.status(400).json({
        message: "Name and URL are required",
      });
    }
    const service = await createService(
      req.user.id,
      name,
      url,
      checkInterval || 60,
    );

    res.status(201).json({
      message: "service added successfully",
      service,
    });
  } catch (error) {
    console.error("error");
    res.status(500).json({
      message: "failed to add service",
      error: error.message,
    });
  }
};
const getServices = async (req, res) => {
  try {
    const services = await getuserServices(req.user.id);
    res.status(200).json({
      services,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to retrieve services",
    });
  }
};

const getService = async (req, res) => {
  try {
    const service = await getserviceById(req.params.id, req.user.id);
    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }
    res.status(200).json({
      service,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch service",
    });
  }
};
const updateServiceDetails = async (req, res) => {
  try {
    const { name, url, checkInterval } = req.body;

    if (!name || !url) {
      return res.status(400).json({
        message: "Name and URL are required",
      });
    }
    const service = await updateService(
      req.params.id,
      req.user.id,
      name,
      url,
      checkInterval || 60,
    );
    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }
    res.status(200).json({
      message: "Service updated succesfully",
      service,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update service",
    });
  }
};
const removeService=async(req,res)=>{
  try{
    const service=await deleteService(
      req.params.id,
      req.user.id
    );

    if(!service){
      return res.status(404).json({
        message:"Service not found"
      });
    }
    res.status(200).json({
      message:"Service deleted successfully"
    });
  }catch(error){
    console.error(error);

    res.status(500).json({
      message:"Failed to delete service"
    });
  }
};
module.exports = {
  addService,
  getServices,
  getService,
  updateServiceDetails,
  removeService
};

