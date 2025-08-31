import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem {
  menuItem: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  orderItems: IOrderItem[];
  totalPrice: number;
  deliveryAddress: string;
  status: string;
  paymentMethod: string;
  isPaid: boolean;
  paidAt?: Date;
}

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    orderItems: [
      {
        menuItem: { type: Schema.Types.ObjectId, required: true, ref: 'MenuItem' },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true, default: 0.0 },
    deliveryAddress: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'out for delivery', 'delivered'],
      default: 'pending',
    },
    paymentMethod: { type: String, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>('Order', orderSchema);