const db = require("../database/connectDB");
const stripe = require("stripe");
const env = require("dotenv");
const { default: knex } = require("knex");
env.config();

const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

exports.getAllPayments = async () => {
  return await db("payment").select("*");
};

exports.getPaymentsByUserId = async (userId) => {
  return await db("payment").select("*").where("user_id", userId);
};
//payment detail
exports.getPaymentDetail = async (paymentId) => {
  try {
    const paymentDetail = await db("payment")
      .select(
        "payment.id_payment",
        "payment.description",
        "payment.account_name",
        "bill_payment.amount",
        "bill.*"
      )
      .join("bill_payment", "payment.id_payment", "bill_payment.payment_id")
      .join("bill", "bill_payment.bill_id", "bill.bill_id")
      .where("payment.id_payment", paymentId);

    if (!paymentDetail.length) {
      console.log(`No payment found with id: ${paymentId}`);
      return;
    }
    const PaymentInfo = {
      payment_id: paymentDetail[0].id_payment,
      description: paymentDetail[0].description,
      account_name: paymentDetail[0].account_name,
    };

    const billDetails = paymentDetail.map((bill) => {
      return {
        bill_id: bill.bill_id,
        fee_type: bill.fee_type,
        fee: bill.fee,
        create_at: bill.create_at,
        due_at: bill.due_at,
        description: bill.description,
        create_by: bill.create_by,
        payer: bill.payer,
        year: bill.year,
        month: bill.month,
        paid: bill.amount,
      };
    });

    const result = {
      payment_info: PaymentInfo,
      bill_details: billDetails,
    };

    return result;
  } catch (error) {
    console.log(error);
  }
};
exports.createBill = async (req) => {
  const { fee_type, fee, description, create_by, payers, month, year } =
    req.body;
  const created_at = new Date().toISOString().slice(0, 19).replace("T", " ");
  const due_at = new Date();
  due_at.setDate(due_at.getDate() + 30);
  const formatted_due_at = due_at.toISOString().slice(0, 19).replace("T", " ");
  const newBills = [];
  for (const payer of payers) {
    const newBill = await db("bill").insert({
      fee_type: fee_type,
      fee: fee,
      create_at: created_at,
      due_at: formatted_due_at,
      description: description,
      create_by: create_by, //admin id
      payer: payer,
      year: year,
      month: month,
    });
    newBills.push(newBill);
  }

  return newBills;
};
exports.updateBill = async (
  billId,
  fee_type,
  fee,
  description,
  payer,
  year,
  month
) => {
  try {
    const updatedBill = await db("bill").where({ bill_id: billId }).update({
      fee_type: fee_type,
      fee: fee,
      description: description,
      payer: payer,
      year: year,
      month: month,
    });

    return updatedBill;
  } catch (error) {
    throw error;
  }
};
exports.getAllBill = async () => {
  try {
    const data = await db("bill")
      .select("bill.*", "user.name")
      .join("user", "bill.payer", "user.id_user")
      .orderBy("bill_id", "desc");
    return data;
  } catch (error) {
    throw error;
  }
};
exports.getBillByID = async (billId) => {
  try {
    const data = await db("bill").select("*").where({ bill_id: billId });

    // Check if the data array is empty
    if (data.length === 0) {
      return null;
    }
    return data;
  } catch (error) {
    throw error;
    console.log(error);
  }
};

exports.deleteBill = async (billId) => {
  try {
    const deletedBill = await db("bill").where({ bill_id: billId }).del();

    return deletedBill;
  } catch (error) {
    throw error;
  }
};

exports.getUnpaidBill = async (userId) => {
  const unpaidBills = await db("bill")
    .select(
      "bill_id",
      "fee_type",
      "month",
      db.raw(
        "fee - (SELECT COALESCE(SUM(amount), 0) FROM bill_payment WHERE bill_payment.bill_id = bill.bill_id) AS unpaid_fee"
      ),
      "description",
      "payer"
    )
    .where("payer", userId)
    .whereExists(function () {
      this.select("bill_id")
        .from("bill_payment")
        .whereRaw("bill_payment.bill_id = bill.bill_id")
        .groupBy("bill_id")
        .havingRaw("SUM(amount) < fee");
    })
    .union(function () {
      this.select(
        "bill_id",
        "fee_type",
        "month",
        "fee as unpaid_fee",
        "description",
        "payer"
      )
        .from("bill")
        .where("payer", userId)
        .whereNotExists(function () {
          this.select("bill_id")
            .from("bill_payment")
            .whereRaw("bill_payment.bill_id = bill.bill_id");
        });
    });
  return unpaidBills;
};

exports.createSessionPayment = async (req) => {
  const session = await stripeInstance.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    // success_url: `${process.env.DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}&order=${encodeURI(JSON.stringify(req.body))}`,
    success_url: `${process.env.URL_SUCCESS}`,
    // cancel_url: `${process.env.DOMAIN}/checkout?payment_fail=true`,
    cancel_url: `${process.env.URL_ERROR}`,
    line_items: req.body.items.map((item) => {
      return {
        price_data: {
          currency: "vnd",
          product_data: {
            name: "Tiền Tháng " + item.month, /// tháng mấy
            description: item.description, /// mô tả
            metadata: { bill_id: item.bill_id },
          },
          unit_amount: item.price ? item.price : 200000, // số tiền mỗi tháng
        },
        quantity: 1,
      };
    }),
    metadata: {
      user_id: req.body.user_id,
      description: req.body.description,
    },
  });

  return session.url;
};

exports.handleWebhook = async (req) => {
  const payload = req.body;
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripeInstance.webhooks.constructEvent(
      payload,
      sig,
      endpointSecret
    );
  } catch (error) {
    throw new Error(`Webhook Error: ${error.message}`);
  }
  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const payment = await db("payment").insert({
        amount_money: session.amount_total,
        user_id: session.metadata.user_id,
        account_name: session.customer_details.name,
        description: session.metadata.description,
        pay_method: session.payment_method_types,
        create_at: new Date(session.created * 1000)
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
      });
      /// lay them bill_id, add vào bảng bill_payment
      const payment_id = payment[0];
      const session_id = session.id;
      const session2 = await stripeInstance.checkout.sessions.retrieve(
        session_id,
        {
          expand: ["line_items.data.price.product"],
        }
      );
      const lineItems = session2.line_items.data;
      for (const item of lineItems) {
        await db("bill_payment").insert({
          bill_id: item.price.product.metadata.bill_id,
          payment_id: payment_id,
          amount: item.amount_total,
        });
      }
      break;
    // Add other event handlers here
    ///....//
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
};

exports.handlePaymentSuccess = async (session_id) => {
  // Retrieve the payment session from Stripe
  const session = await stripeInstance.checkout.sessions.retrieve(session_id, {
    expand: ["line_items.data.price.product"],
  });

  // Handle the payment success
  if (session.payment_status === "paid") {
    // Extract the line items from the session
    const lineItems = session.line_items.data;
    // Map the line items to extract the relevant information
    const items = lineItems.map((item) => {
      const { name, description, metadata } = item.price.product;
      const bill_id = metadata.bill_id;
      const { currency, unit_amount } = item.price;

      return {
        name,
        description,
        bill_id,
        currency,
        unit_amount,
      };
    });
    return items;
  } else {
    throw new Error("Payment failed");
  }
};
