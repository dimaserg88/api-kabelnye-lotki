import mongoose from "mongoose";


const RoleSchema = new mongoose.Schema({
    value: { type: String, unique: true, required: true, default: 'USER' }
})

export default mongoose.model('Role', RoleSchema)