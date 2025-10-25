const Bookings=require("./bookings");
const Users = require("./user");
const Bus=require("./bus");
    


// one to many 
Users.hasMany(Bookings,{foreignKey:"userId"});
Bookings.belongsTo(Users,{foreignKey:"userId"});

// one to many
Bus.hasMany(Bookings,{foreignKey:"busId"});
Bookings.belongsTo(Bus,{foreignKey:"busId"});


module.exports={
    Users,
    Bookings,
    Bus
}