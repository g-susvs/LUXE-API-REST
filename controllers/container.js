
const getContainers = (req,res) => {
    res.status(200).json({
        msg:'get - containers'
    })
}
const getContainer = (req,res) => {
    const {id} = req.params;
    res.status(200).json({
        msg:'get - container ',
        id
    })
}
const createContainer = (req,res) => {
    const body = req.body;
    res.status(200).json({
        msg:'post - container ',
        body
    })
}
const updateContainer = (req,res) => {
    const {id} = req.params;
    const body = req.body;
    res.status(200).json({
        msg:'update - container',
        id,
        body
    })
}
const deleteContainer = (req,res) => {
    const {id} = req.params;
    
    res.status(200).json({
        msg:'delete - container',
        id
    })
}

module.exports = {
    getContainer,
    getContainers,
    createContainer,
    updateContainer,
    deleteContainer
}