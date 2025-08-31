import mongoose, { Document, Schema } from 'mongoose';

export interface IMenuItem extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
}

const menuItemSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IMenuItem>('MenuItem', menuItemSchema);