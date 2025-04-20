const ntnData = [
  {
    telecom: "ufone",
    cnicFrontUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    cnicBackUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    user: {
      firstName: "Ali",
      lastName: "Khan",
      cnic: "1234567890123",
    },
    fbrCredentials: {
      username: "username123",
      password: "password123",
    },
    phone: "+923001234567",
    applicationStatus: "approved", // green
    invoiceStatus: "paid", //green
    receiptImageUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
  },
  {
    telecom: "jazz",
    cnicFrontUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    cnicBackUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    user: {
      firstName: "Ali",
      lastName: "Khan",
      cnic: "1234567890123",
    },
    fbrCredentials: {
      username: "username123",
      password: "password123",
    },
    phone: "+923009876543",
    applicationStatus: "requested", //orange
    invoiceStatus: "unpaid", // red
    receiptImageUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
  },
  {
    telecom: "jazz",
    cnicFrontUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    cnicBackUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    user: {
      firstName: "Ali",
      lastName: "Khan",
      cnic: "1234567890123",
    },
    fbrCredentials: {
      username: "username123",
      password: "password123",
    },
    phone: "+923009876543",
    applicationStatus: "rejected", // red
    invoiceStatus: "unpaid",
    receiptImageUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
  },
  {
    telecom: "jazz",
    cnicFrontUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    cnicBackUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    user: {
      firstName: "Ali",
      lastName: "Khan",
      cnic: "1234567890123",
    },
    fbrCredentials: {
      username: "username123",
      password: "password123",
    },
    phone: "+923009876543",
    applicationStatus: "working", //blue
    invoiceStatus: "unpaid",
    receiptImageUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
  },
  {
    telecom: "jazz",
    cnicFrontUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    cnicBackUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    user: {
      firstName: "Ali",
      lastName: "Khan",
      cnic: "1234567890123",
    },
    fbrCredentials: {
      username: "username123",
      password: "password123",
    },
    phone: "+923009876543",
    applicationStatus: "requested",
    invoiceStatus: "unpaid",
    receiptImageUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
  },
];

const salesTaxData = [
  {
    taxYear: "2024",
    taxMonth: "July",
    invoiceStatus: "paid", //green
    applicationStatus: "approved", // green
    receiptImageUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    fbrCredentials: {
      username: "username123",
      password: "password123",
    },
    saleInvoices: [
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    ],
    exportInvoices: [
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    ],
  },
  {
    taxYear: "2024",
    taxMonth: "July",
    invoiceStatus: "unpaid", //red
    applicationStatus: "rejected", // red
    receiptImageUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    fbrCredentials: {
      username: "username123",
      password: "password123",
    },
    saleInvoices: [
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    ],
    exportInvoices: [
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    ],
  },

  {
    taxYear: "2024",
    taxMonth: "July",
    invoiceStatus: "paid", //green
    applicationStatus: "working", // blue
    receiptImageUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    fbrCredentials: {
      username: "username123",
      password: "password123",
    },
    saleInvoices: [
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    ],
    exportInvoices: [
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    ],
  },

  {
    taxYear: "2024",
    taxMonth: "July",
    invoiceStatus: "paid", //green
    applicationStatus: "requested", // orange
    receiptImageUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    fbrCredentials: {
      username: "username123",
      password: "password123",
    },
    saleInvoices: [
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    ],
    exportInvoices: [
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    ],
  },
];
