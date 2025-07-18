// import jwt from "jsonwebtoken";
// import Employee from "../models/employee.js";
// import bcrypt from "bcryptjs";

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log(email);
//     console.log(password);
//     const employee = await Employee.findOne({ email }).select("+password");
//     if (!employee) {
//       return res.status(400).json({
//         status: false,
//         message: "Invalid email or password",
//       });
//     }
//     const isMatch = await bcrypt.compare(password, employee.password);
//     if (!isMatch) {
//       return res.status(400).json({
//         status: false,
//         message: "Invalid email or password",
//       });
//     }
//     const token = jwt.sign(
//       { id: employee._id, email: employee.email },
//       (token, process.env.JWT_SECRET);
//       { expiresIn: "1h" }
//     );
//     res.cookie("token", token, {
//       httpOnly: true,
//       expires: new Date(Date.now() + 3600000),
//       secure: process.env.NODE_ENV === "production",
//     });
//     return res.status(200).json({
//       status: true,
//       message: "Login success",
//       data: {
//         token,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Login failed",
//       error: error.message,
//     });
//   }
// };
// export default login;

import jwt from "jsonwebtoken";
import Employee from "../models/employee.js";
import bcrypt from "bcryptjs";

const login = async(req, res) => {

    
    try{
        const { email, password } = req.body;
        

        
        
        
        
        // const employee = await Employee.findOne({email}).select('+password');// To check email and password both are correct or not

        const employee = await Employee.findOne({email}).select('+password');

        
        
        if (!employee){
            res.status(400).json({
                status: false, 
                message: "Invalid email or password"
            })
        }
        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch){
            res.status(400).json({
                status: false, 
                message: "Invalid email or password"
            })
        }      
        const token = jwt.sign({id: employee._id, email: employee.email},jwt.verify(token, process.env.JWT_SECRET),{
            expiresIn:'1h'
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000 // 1 hour
        });
        res.status(200).json({
            status: true,
            message:"Login successful",
            data:{
                token
            }
        })
    }
    catch(Exception){
        console.log(Exception);
        
        res.status(500).json({
            status: false,
            message: "Error logging in",
            error: Exception.message
        })
    }
}

export {login}
