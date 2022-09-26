const getItems = (req,res) => {
    res.status(200).json({
        msg:'get - items'
    })
}

module.exports={
    getItems
}