const {Sequelize} =require("sequelize");

const sequelize= new Sequelize('testdb','root','Sumit@229',{
    host:'localhost',
    dialect:'mysql'
});



(async()=>{ try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.")
    
} catch (error) {
    console.log(error);
    
}
})();

module.exports=sequelize;