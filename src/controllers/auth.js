import { registerSchema, signinSchema } from "../schemas/auth";
import User from "../models/auth";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const signup = async(req,res) =>{
  // lay du lieu user gui len
//   console.log(req.body);
 const {username, email, password} = req.body
  // kiem tra tinh hop le cua du lieu
 const {error} =  registerSchema.validate(req.body,{abortEarly: false });
 // neu du lieu ko hop le thi bao loi
 if (error) {
    const errorMessage = error.details.map((message) => message.message );
    return res.status(400).json({message: errorMessage})
 }
  //kiem tra xem user da ton tai hay chua
   const existUser = await User.findOne({email:email});
   if (existUser) {
    return res.status(400).json({message:"Email da ton tai"});
   }
  // ma hoa mat khau
   const hashedPassword = await bcryptjs.hash(password, 10);
//   console.log(hashedPassword);
  // luu thong tin user dang ky vao db
 const user = await User({ username, email, password: hashedPassword}).save()
  // tra ve thong bao dang ky thanh cong va thong tin dăng ky(ko bao gom password)
  user.password = undefined
  res.status(201).json({
    message: "Dang ky thanh cong",
    data: user,
  })
}
export const signin = async(req,res) =>{
    // nhận dữ liệu từ client gửi lên
    const  {email, password} = req.body;
    // kiểm tra tính hợp lệ thì trả về thông báo lỗi
    const  {error} = signinSchema.validate(req.body,{abortEarly: false })
    if (error) {
        const errorMessage = error.details.map((message) => message.message );
        return res.status(400).json({message: errorMessage})
    }
    // kiểm tra xem user có tồn tại hay không
    const existUser = await User.findOne({email: email});
    // nếu user không tồn tại thì trả về thông báo lỗi
    if (!existUser) {
        return res.status(400).json({message:"Email ko ton tai"});
       }
    //kiểm tra mk có đúng với mk đã luwu trong db không
    const validPassword = await bcryptjs.compare(password, existUser.password)
    // console.log(validPassword);
    // nếu mk ko đúng thì báo lỗi
    if (!validPassword) {
        return res.status(400).json({message:"Mat khau khong dung"})
    }
    else{
    // Mat khau dung
    // Tạo token
    const token = jwt.sign({id:existUser._id},'12346', {expiresIn: "30s"})
    res.cookie("token", token, {httpOnly: true} )
    // nếu đúng trả về thông báo đăng nhập thành công và thông tin user dăng nhap  
    existUser.password = undefined;
    res.status(200).json({
        message: "Dang nhap thanh cong",
        data: existUser,
        token:token
    })
  }
}
