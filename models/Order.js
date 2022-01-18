const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  date: {
    type: Date,
    default: Date.now
  },
  product: {
    type: String
  },
  amazonSalePrice: {
    type: Number
  },
  productCost: {
    type: Number
  },
  shippingCost: {
    type: Number
  },
  supplierTax: {
    type: Number
  },
  grossProfit: {
    type: Number
  },
  amazonFees: {
    type: Number
  },
  adminFees: {
    type: Number
  },
  netProfit: {
    type: Number
  },
  shipStatus: {
    type: String
  },
  refunded: {
    type: String
  },
  shipperName: {
    type: String
  },
  walmartOrder: {
    type: String
  },
  amazonOrderID: {
    type: String
  },
  notes: {
    type: String
  },
  amazonTax: {
    type: Number
  },
  returnLabelFees: {
    type: String
  },
  amazonRefundAudit: {
    type: String
  },
  amazonOrderIdTotalAudit: {
    type: String
  },
  refundLabelAudit: {
    type: String
  },
  adminFeeFormula: {
    type: String
  },
})

module.exports = mongoose.model('order', OrderSchema)