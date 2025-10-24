const Students=require("./students");
const IdentityCard=require("./identitycard");
const Departments=require("./department");
const Courses=require("./courses");
const StudentCourses=require("./studentCourses");

// one to one
Students.hasOne(IdentityCard);
IdentityCard.belongsTo(Students);

// one to many
Departments.hasMany(Students,{ foreignKey: "departmentId", as: "students" });
Students.belongsTo(Departments,{ foreignKey: "departmentId", as: "department" });

// many to many
Students.belongsToMany(Courses,{through:StudentCourses});
Courses.belongsToMany(Students,{through:StudentCourses});

module.exports={
    Students,
    IdentityCard,
    Departments,
    Courses,
    StudentCourses
}