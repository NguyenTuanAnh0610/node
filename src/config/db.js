import mongoose from "mongoose";

export const mongooseDB = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/WD18408');
        console.log('Kết nối thành công')
    } catch (error) {
        console.error('Lỗi toác đầu ',error);
    }
}