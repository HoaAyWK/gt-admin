export const STATUS = Object.freeze({
  ALL: 'All',
  PAID: 'Paid',
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  COMPLETED: 'Completed',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
  REFUNDED: 'Refunded'
});

export const ORDER_STATUS = Object.freeze([
  STATUS.ALL,
  STATUS.PAID,
  STATUS.PROCESSING,
  STATUS.DELIVERED,
  STATUS.CANCELLED
]);
