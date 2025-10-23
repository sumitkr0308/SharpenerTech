const Students=require("./students");
const IdentityCard=require("./identitycard");
const Departments=require("./department");

// one to one
Students.hasOne(IdentityCard);
IdentityCard.belongsTo(Students);

// one to many
Departments.hasMany(Students,{ foreignKey: "departmentId", as: "students" });
Students.belongsTo(Departments,{ foreignKey: "departmentId", as: "department" });

module.exports={
    Students,
    IdentityCard,
    Departments
}