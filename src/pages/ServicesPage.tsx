/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "../constant/Layout";
import LayoutHeader from "../components/LayoutHeader";
import { Table, Pagination, Button, Space, message, Modal } from "antd";
import { useState, useEffect, useRef } from "react";
import arrowIcon from "../assets/images/arrow-icon.svg";
import saveIcon from "../assets/images/save-btn.svg";
import * as Action from "../store/slice/services/index";
import { connect } from "react-redux";
import detailIcon from "../assets/images/detail-icon.svg";
import printIcon from "../assets/images/print-icon.svg";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormSelect } from "../components/basic";
import { useFieldArray } from "react-hook-form";
import logo2 from "../assets/images/sidebar-logo.svg";
import { format } from "date-fns";
import { debounce } from "lodash";


interface Service {
  getSERVICES: (Pagination: any) => unknown;
  services_Red: any;
  AddSERVICES: (formData: any) => unknown;
  getCustomer: (customer: any) => unknown;
  getVehicleByID: (id: number) => unknown;
  getProduct: (customer: any) => unknown;
  getPrint: (customer: any) => unknown;
}

interface DataSource {
  customerName: string;
  serviceDate: string;
  mileage: number;
  dueMileage: number;
  amount: number;
  discount: number;
  totalAmount: number;
  paidAmount: number;
  paymentType: string;
  services: Array<{
    productId: number;
    productName: string;
    productType: string;
    quantity: number;
    price: number;
  }>;
}

interface ServiceFormValues {
  customerId: number;
  serviceDate: string;
  mileage: number;
  dueMileage: number;
  amount: number;
  vehicleId?: number;
  InstrumentNo?: string;
  discount?: number;
  paidAmount: number;
  Payable: number;
  paymentTypeId: string;
  services: Array<{
    productId?: number | undefined;
    quantity?: number | undefined;
    price?: number | undefined;
  }>;
}

interface ApiResponse {
  data: {
    customerId: string;
    serviceDate: string;
    mileage: number;
    dueMileage: number;
    vehicleId?: number;
    InstrumentNo: string;
    amount: number;
    discount?: number;
    paidAmount: number;
    paymentTypeId: string;
    services: Array<{
      productId: number;
      productName: string;
      quantity: number;
      price: number;
    }>;
  };
}

const validationSchema = yup.object().shape({
  customerId: yup.number().required("Customer ID is required"),
  serviceDate: yup
    .string()
    .required("Service date is required")
    .test("valid-date", "Invalid date format", (value) => {
      return value ? !isNaN(Date.parse(value)) : false;
    }),
  mileage: yup.number().required("Mileage is required").positive(),
  dueMileage: yup.number().required("Due mileage is required").positive(),
  vehicleId: yup.number().optional(),
  amount: yup.number().required("Amount is required").positive(),
  discount: yup.number().min(0).optional(),
  paidAmount: yup.number().required("Paid amount is required"),
  Payable: yup.number().required("Paid amount is required"),
  paymentTypeId: yup.string().required("Payment type is required"),
  InstrumentNo: yup.string().optional(),
  services: yup
    .array()
    .of(
      yup.object().shape({
        productId: yup.number().optional(),
        quantity: yup.number().optional().min(0.1),
        price: yup.number().optional().min(0),
      })
    )
    .min(1, "At least one service item is required")
    .required("Services are required"),
});

const ServicesPage: React.FC<Service> = ({
  getSERVICES,
  services_Red,
  AddSERVICES,
  getCustomer,
  getVehicleByID,
  getProduct,
  getPrint,
}) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(40);
  const [tableData, setTableData] = useState<DataSource[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const [isfilteredData, setFilteredData] = useState<DataSource[]>([]);
  const [search, setSearch] = useState("");
  const [customerOptions, setCustomerOptions] = useState<any[]>([]);
  const [productOptions, setProductOptions] = useState<any[]>([]);
  const [vehicleOptions, setVehicleOptions] = useState<any[]>([]);
  const [isCustomerLoading, setIsCustomerLoading] = useState(false);
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [instrumentOpen, setInstrumentNo] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  console.log(services_Red);

  const firstFieldRef = useRef<any>(null);

  useEffect(() => {
    if (showForm && firstFieldRef.current) {
      setTimeout(() => {
        firstFieldRef.current?.focus();
      }, 100);
    }
  }, [showForm]);

  const allColumns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Service Date",
      dataIndex: "serviceDate",
      key: "serviceDate",
    },
    {
      title: "Vehicle No",
      dataIndex: "vehicleNo",
      key: "vehicleNo",
    },
    {
      title: "Vehicle Model",
      dataIndex: "vehicleModel",
      key: "vehicleModel",
    },
    {
      title: "Invoice No",
      dataIndex: "invoiceNo",
      key: "invoiceNo",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (value: number) => `Rs:${value.toFixed(2)}`,
    },
    {
      title: "Paid Amount",
      dataIndex: "paidAmount",
      key: "paidAmount",
      render: (value: number) => `Rs:${value.toFixed(2)}`,
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      key: "paymentType",
    },
    {
      title: "Actions",
      dataIndex: "Actions",
      key: "Actions",
      fixed: "right" as const,
      render: (_: any, record: any) => {
        return (
          <Space size="middle">
            <img
              src={detailIcon}
              alt="Details"
              className="w-[29px] h-[29px] flex items-center justify-center bg-secondary rounded-[5px] text-whites"
            />
            <img
              src={printIcon}
              alt="Print"
              onClick={() => handlePrint(record)}
              className="w-[29px] h-[29px] flex items-center justify-center bg-secondary rounded-[5px] text-whites"
            />
          </Space>
        );
      },
    },
  ];

  const handlePrint = async (record: any) => {
    try {
      const printData: any = await getPrint(record.serviceId);
      if (printData) {
        printReceipt(printData.data);
      } else {
        message.error("Failed to fetch print data.");
      }
    } catch (error) {
      message.error("An error occurred while fetching print data.");
    }
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
  } = useForm<ServiceFormValues>({
    defaultValues: {
      customerId: undefined,
      serviceDate: undefined,
      mileage: undefined,
      dueMileage: undefined,
      vehicleId: undefined,
      InstrumentNo: undefined,
      amount: undefined,
      discount: undefined,
      paidAmount: undefined,
      Payable: undefined,
      paymentTypeId: undefined,
      services: [
        {
          productId: undefined,
          quantity: 1,
          price: undefined,
        },
      ],
    },
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    setLoadingText(true);
    setTimeout(() => {
      setLoadingText(false);
    }, 2000);
  }, []);

  const printReceipt = (data: any) => {
    const iframeId = "print-iframe";
    let iframe = document.getElementById(iframeId) as HTMLIFrameElement;

    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.id = iframeId;
      iframe.style.position = "absolute";
      iframe.style.left = "-9999px";
      iframe.style.visibility = "hidden";
      document.body.appendChild(iframe);
    }
    const content = `
    <html>
      <head>
        <title>Receipt</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .header { text-align: center; margin-bottom: 20px; }
          .section { margin-bottom: 15px; }
          .section2 { margin-bottom: 15px; display:flex; justify-content:space-between; }
          .printName{
            display:flex;
            justify-content:space-between;
          }
            .payment-info{border:1px solid black;}
            .boldAmount{font-size: 12px; font-weight:bold; margin:5px}
          .bold { font-size: 10px; font-weight:bold; margin:5px }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; position: relative; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size:12px; }
          .quantity-total {
            position: absolute;
            left: calc(50% - 30px);
            bottom: -20px;
            font-size: 10px;
            font-weight: bold;
          }
          
          /* Enhanced Thank You Note Styles */
          .thanknote-container {
            position: absolute;
            bottom: 80px;
            left: 0;
            right: 0;
            text-align: center;
            padding: 15px 0;
          }
          .thanknote {
            display: inline-block;
            background: #f8f8f8;
            border-left: 4px solid #2a7f62;
            padding: 12px 20px;
            font-size: 12px;
            color: #333;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin: 10px 0;
            text-align: center;
            position: relative;
          }
          .thanknote:before {
            content: """;
            font-size: 24px;
            color: #2a7f62;
            position: absolute;
            left: 5px;
            top: 5px;
          }
          .thanknote:after {
            content: """;
            font-size: 24px;
            color: #2a7f62;
            position: absolute;
            right: 5px;
            bottom: 5px;
          }
          .thanknote strong {
            display: block;
            font-size: 14px;
            color: #2a7f62;
            margin-bottom: 5px;
          }
          
          @media print {
            img { visibility: visible !important; }
            @page {
              size: A5;
              margin: 0;
            }
            .bold { font-size: 10px; font-weight:bold; margin:5px; }
            body {
              visibility: hidden;
              width: 148mm;
              min-height: 210mm;
            }
            #receipt-container {
              visibility: visible;
              margin: 0;
              padding: 2mm;
            }
            .notice {
              position: fixed;
              bottom: 5mm;
              font-size: 8px;
              width: calc(148mm - 4mm);
            }
            .thanknote-container {
              position: fixed;
              bottom: 25mm;
            }
            .thanknote {
              background: none;
              border-left: none;
              box-shadow: none;
              padding: 10px;
            }
            .quantity-total {
              left: calc(50% - 30px);
              bottom: -50px;
              font-size: 10px;
              font-weight: bold;
            }
          }
          .head {
            font-size:10px;
          }  
          .head2 {
            font-size:16px;
            margin: 5px 0;
          }
          .notice {
            position: absolute;
            bottom: 30px;
            text-align: center;
            font-size: 10px;
            width: calc(100% - 40px);
          }
          .total-section {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
          }
          .payment-info {
            text-align: right;
            border:1px solid black;
          }
        </style>
      </head>
      <body>
        <div id="receipt-container">
          <div class="header">
            <img src=${logo2} alt="Company Logo" style="max-width: 140px; margin-bottom: 10px;" />
            <h1 class="head2">Burfat & Co.</h1>
            <h1 class="head2">One Star Oil Change & Autotech Workshop</h1>
            <p class="head"><b>Asad & Awais Chamber Opposite CAA Club Near Star Gate Main Shahrah e Faisal, Karachi</b></p>
            <p class="head"><b>Shop Timing : 9:00am to 9:00pm, Sunday : 10:00am to 9:00pm, Friday: Off</p>
            <p class="head"><b>Contact : 0311-3311125 / 0302-2161979</b></p>
            <p class="head bold">Invoice No: ${data?.invoiceNo}</p>
          </div>
          
          <div class="section">
            <div class="printName">
              <div>
                <p class="bold">Customer: ${data?.customerName}</p>
                <p class="bold">Vehicle No: ${data?.vehicleNo}</p>
                <p class="bold">Phone No: ${data?.contactNo}</p>
              </div>
              <div>
                <p class="bold">Service Date: ${new Date(
                  data?.serviceDate
                ).toLocaleDateString()}</p> 
                <p class="bold">Mileage: ${data?.mileage}</p>
                <p class="bold">Due Mileage: ${data?.dueMileage}</p>
              </div>
            </div>
          </div>
          
          <div class="section" style="position: relative;">
            <table>
              <thead>
                <tr>
                  <th>S:No</th>
                  <th>Product</th>
                  <th>Type</th>
                  <th>Q</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
             <tbody>
  ${data?.services
    ?.map((service: any, index: number) => {
      const formattedPrice = Number.isInteger(service?.price)
        ? service.price.toString()
        : service?.price.toFixed(2);
      const total = service?.quantity * service.price;
      const formattedTotal = Number.isInteger(total)
        ? total.toString()
        : total.toFixed(2);

      return `
        <tr>
          <td>${index + 1}</td>
          <td>${service?.productName}</td>
          <td>${service?.productType}</td>
          <td>${service?.quantity}</td>
          <td>Rs:${formattedPrice}</td>
          <td>Rs:${formattedTotal}</td>
        </tr>
        `;
    })
    .join("")}
</tbody>
            </table>
            <div class="quantity-total">
              Total Quantity: ${
                data?.services?.reduce(
                  (acc: any, service: any) => acc + (service.quantity || 0),
                  0
                ) || 0
              }
            </div>
          </div>
          
          <div class="total-section">
            <div>
              <p class="bold">Payment Type: ${data?.paymentType}</p>
            </div>
            <div class="payment-info">
              <p class="boldAmount">Payable: Rs:${data?.amount}</p>
              ${
                data?.discount
                  ? `<p class="boldAmount">Discount: Rs:${data?.discount.toFixed(
                      2
                    )}</p>`
                  : ""
              }
              <p class="boldAmount">Total Payable Amount: Rs:${data?.paidAmount.toFixed(
                2
              )}</p>
            </div>
          </div>
          
          <div class="thanknote-container">
            <div class="thanknote">
              <strong>Thank You For Your Business!</strong>
              We truly appreciate your trust in our services.<br>
              Your satisfaction is our top priority.<br>
              Looking forward to serve you again soon!
            </div>
          </div>
          
          <p class="notice">All Prices are subject to change without prior notices at the time of delivery will be charged in case of Return Bring this bill Please Check the Qty & Leakage, company will not be responsible after the service.</p>
        </div>
      </body>
    </html>
  `;
    if (iframe.contentDocument) {
      iframe.contentDocument.open();
      iframe.contentDocument.write(content);
      iframe.contentDocument.close();

      // Wait for content to load before printing
      iframe.onload = () => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      };
    }
  };

  useEffect(() => {
    if (showForm) {
      const currentDate = format(new Date(), "yyyy-MM-dd");
      setValue("serviceDate", currentDate);
    }
  }, [showForm, setValue]);

  const submitCustomer = (data: ServiceFormValues) => {
    Modal.confirm({
      title: "Confirm Service",
      content: "Are you sure you want to add this service?",
      okText: "Confirm",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const formData = {
            customerId: data.customerId,
            serviceDate: data.serviceDate,
            mileage: data.mileage,
            dueMileage: data.dueMileage,
            vehicleId: data.vehicleId,
            amount: data.amount,
            InstrumentNo: data.InstrumentNo ? data.InstrumentNo : null,
            discount: data.discount,
            paidAmount: data.paidAmount,
            paymentTypeId: data.paymentTypeId,
            services: data.services.map((service) => ({
              productId: service.productId,
              quantity: service.quantity,
              price: service.price,
            })),
          };
          const res: any = await AddSERVICES(formData);
          if (res.code === 200) {
            message.success("Service added successfully!");
            Modal.confirm({
              title: "Print Receipt",
              content: "Do you want to print the receipt now?",
              okText: "Print",
              cancelText: "Cancel",
              onOk: () => printReceipt(res.data),
            });
            getSERVICES({
              pageNumber: currentPage,
              pageSize: pageSize,
            });
            setShowForm(false);
            reset();
          } else {
            message.error(res.message);
          }
        } catch (error) {
          message.error("Failed to add service. Please try again.");
        }
      },
    });
  };

  const generateReceiptHTML = (data: ApiResponse["data"]) => {
    return `...`;
  };


  useEffect(() => {
    getProduct({
      pageNumber: currentPage,
      pageSize: pageSize,
      search: productSearchTerm,
    });
  }, [currentPage, pageSize, productSearchTerm]);

  const debouncedProductSearch = debounce((value: string) => {
    setProductSearchTerm(value);
    setCurrentPage(1);
    setProductOptions([]);
  }, 500);


  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  useEffect(() => {
    if (services_Red.cusData?.data?.data) {
      const newOptions = services_Red.cusData.data.data.map((item: any) => ({
        label: item.displayText,
        value: item.id,
      }));
      if (currentPage === 1) {
        setCustomerOptions(newOptions);
      } else {
        setCustomerOptions((prev) => [...prev, ...newOptions]);
      }
    }
  }, [services_Red.cusData]);

  const handleProductSearch = (value: string) => {
    if (value.length >= 3 || value.length === 0) {
      debouncedProductSearch(value);
    }
  };

  useEffect(() => {
    if (services_Red.proData?.data) {
      const newProOptions = services_Red.proData.data.data.map((item: any) => ({
        label: item.displayText,
        value: item.id,
        price: item.price,
      }));
      setProductOptions((prev) => [
        ...prev,
        ...newProOptions.filter(
          (newOpt: any) =>
            !prev.some((prevOpt) => prevOpt.value === newOpt.value)
        ),
      ]);
    }
  }, [services_Red.proData]);

  useEffect(() => {
    setIsCustomerLoading(services_Red.loading);
  }, [services_Red.loading]);

  const customerId = watch("customerId");

  useEffect(() => {
    if (customerId) {
      getVehicleByID(customerId);
    }
  }, [customerId]);

  useEffect(() => {
    if (services_Red.vehData?.data) {
      // const vehicles = services_Red.vehData.data;
      const newOptions = services_Red.vehData.data.map((item: any) => ({
        label: item.vehicleNumber,
        value: item.id,
      }));
      setVehicleOptions(newOptions);

      // if (vehicles.lenght === 1) {
      //   setValue("vehicleId", vehicles[0]?.value);
      // } else {
      //   setVehicleOptions(newOptions);
      // }
    }
  }, [services_Red.vehData]);

  const handlePopupScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target) {
      const scrollTop = target.scrollTop;
      const scrollHeight = target.scrollHeight;
      const clientHeight = target.clientHeight;
      const isNearBottom = scrollHeight - (scrollTop + clientHeight) <= 20;

      if (isNearBottom) {
        const total = services_Red.cusData?.data?.totalCount || 0;
        const totalPages = Math.ceil(total / pageSize);
        if (currentPage < totalPages) {
          setCurrentPage((prev) => prev + 1);
        }
      }
      if (isNearBottom) {
        const productTotal = services_Red.proData?.data?.totalCount || 0;
        const productTotalPages = Math.ceil(productTotal / pageSize);
        if (currentPage < productTotalPages) {
          setCurrentPage((prev) => prev + 1);
        }
      }
    }
  };

  const amount = watch("amount");
  const services = watch("services");
  const discount = watch("discount");

  useEffect(() => {
    const paidAmount = amount - (discount || 0);
    setValue("Payable", paidAmount);
  }, [amount, discount, setValue]);

  useEffect(() => {
    const totalAmount = services.reduce((sum, item) => {
      return sum + (item.price || 0) * (item.quantity || 0);
    }, 0);

    setValue("amount", totalAmount);

    const paidAmount = totalAmount - (discount || 0);
    setValue("Payable", paidAmount);
  }, [services, discount, setValue]);

  const Addprice = () => {
    const services = getValues("services");
    const totalAmount = services.reduce((sum, item) => {
      return sum + (item.price || 0) * (item.quantity || 0);
    }, 0);
    setValue("amount", totalAmount);

    const paidAmount = totalAmount - (getValues("discount") || 0);
    setValue("Payable", paidAmount);
  };


  

  useEffect(() => {
    const subscription = watch((value) => {
      setInstrumentNo(value.paymentTypeId !== "Cash");
    });
    return () => subscription.unsubscribe();
  }, [watch, instrumentOpen]);


    useEffect(() => {
    getSERVICES({
      pageNumber: currentPage || 1,
      pageSize: pageSize,
      SearchText: search
    });
  }, [currentPage, pageSize, search]);

  useEffect(() => {
    getCustomer({
      pageNumber: currentPage || 1,
      pageSize: pageSize,
      search: search,
    });
  }, [currentPage, pageSize, search]);


const handleSearch = (value: string) => {
  setSearchQuery(value);
  setIsSearching(true);
  setCurrentPage(1);
  debouncedSearch(value);
};

const debouncedSearch = useRef(
    debounce((value: string) => {
      getSERVICES({
        pageNumber: currentPage || 1,
        pageSize: pageSize,
        SearchText: value,
      });
      getCustomer({
         pageNumber: currentPage || 1,
        pageSize: pageSize,
        search: value,
      })
      setIsSearching(false);
    }, 500)
  ).current;

useEffect(() => {
  return () => {
    debouncedSearch.cancel();
  };
}, [debouncedSearch]);

  return (
    <Layout>
      {showForm ? (
        <form action="" onSubmit={handleSubmit(submitCustomer)}>
          <div className="p-2">
            <div className="flex items-center justify-between">
              <p className="text-[24px] text-supporting_gray border-l border-[#000000] pl-4">
                Add Service
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex items-center gap-4 bg-primary rounded-[10px] p-4 cursor-pointer py-3 px-4"
                >
                  <img src={arrowIcon} alt="arrowIcon-Icon" />
                  <span className="text-[16px] text-white">Back</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-x-4 mt-5 gap-x-4">
              <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
                Customer
              </p>
              <FormSelect
                ref={firstFieldRef}
                autoFocus
                Label=""
                placeholder="Customer"
                name="customerId"
                className="text-[16px] font-bold text-supporting_gray w-100 flex-shrink-0 h-12"
                labelClass="text-[16px] font-bold color-light"
                options={customerOptions}
                onSearch={handleSearch}
                onPopupScroll={handlePopupScroll}
                filterOption={false}
                showSearch
                loading={isCustomerLoading}
                onChange={(value: any) => setValue("customerId", value)}
                errors={errors}
                control={control}
              />
            </div>
            <div className="flex items-center gap-x-4 mt-5 gap-x-4">
              <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
                Service Date
              </p>
              <FormInput
                Label=""
                placeholder="Enter Mobile Number"
                classInput="text-[16px] font-bold text-supporting_gray  w-100 flex-shrink-0 h-12"
                classError="text-red-500"
                name="serviceDate"
                type="Date"
                errors={errors}
                control={control}
              />
            </div>
            <div className="flex items-center gap-x-4 mt-5 gap-x-4">
              <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
                Mileage
              </p>
              <FormInput
                Label=""
                placeholder="Mileage"
                classInput="text-[16px] font-bold text-supporting_gray  w-100 flex-shrink-0 h-12"
                classError="text-red-500"
                name="mileage"
                type="mileage"
                errors={errors}
                control={control}
              />
            </div>
            <div className="flex items-center gap-x-4 mt-5 gap-x-4">
              <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
                Due Mileage
              </p>
              <FormInput
                Label=""
                placeholder="Due Mileage"
                classInput="text-[16px] font-bold text-supporting_gray  w-100 flex-shrink-0 h-12"
                classError="text-red-500"
                name="dueMileage"
                type="dueMileage"
                errors={errors}
                control={control}
              />
            </div>

            <div className="flex items-center gap-x-4 mt-5 gap-x-4">
              <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
                Vehicle No
              </p>
              {/* {vehicleOptions.length === 1 ? ( 
                <FormInput
                  Label=""
                  placeholder="Vehicle No"
                  classInput="text-[16px] font-bold text-supporting_gray w-100 flex-shrink-0 h-12"
                  classError="text-red-500"
                  name="vehicleId"
                  type="vehicleId"
                  value={vehicleOptions[0].label}
                  errors={errors}
                  control={control}
                  disabled
                  autoFocus
                />
              ) : (  */}
              <FormSelect
                Label=""
                placeholder="Select Vehicle"
                name="vehicleId"
                className="text-[16px] font-bold text-supporting_gray w-100 flex-shrink-0 h-12"
                labelClass="text-[16px] font-bold color-light"
                options={vehicleOptions}
                filterOption={false}
                showSearch
                loading={isCustomerLoading}
                onChange={(value: any) => setValue("vehicleId", value)}
                errors={errors}
                control={control}
              />
              {/* )}  */}
            </div>
            <div className="flex items-center gap-x-4 mt-5 gap-x-4">
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Services</h3>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-4 mb-4">
                    <FormSelect
                      Label=""
                      placeholder="productId"
                      name={`services.${index}.productId`}
                      className="text-[16px] font-bold text-supporting_gray flex-shrink-0 h-12"
                      labelClass="text-[16px] font-bold color-light"
                      options={productOptions}
                      style={{ width: "21vw" }}
                      onSearch={handleProductSearch}
                      onPopupScroll={handlePopupScroll}
                      filterOption={false}
                      showSearch
                      loading={isCustomerLoading}
                      onChange={(value: any) => {
                        const selectedProduct = productOptions.find(
                          (prod) => prod.value === value
                        );
                        if (selectedProduct) {
                          setValue(`services.${index}.productId`, value);
                          setValue(
                            `services.${index}.price`,
                            selectedProduct.price
                          );
                          Addprice();
                        }
                      }}
                      errors={errors}
                      control={control}
                    />
                    <FormInput
                      name={`services.${index}.quantity`}
                      control={control}
                      type="number"
                      placeholder="Quantity"
                      classInput="flex-1 h-12"
                      errors={errors}
                      style={{ width: "21vw" }}
                    />
                    <FormInput
                      name={`services.${index}.price`}
                      control={control}
                      type="number"
                      placeholder="Price"
                      classInput="flex-1 h-12"
                      errors={errors}
                      style={{ width: "18vw" }}
                    />
                    <Button
                      className="bg-primary text-white w-12 h-12"
                      onClick={Addprice}
                    >
                      Add
                    </Button>
                    <Button
                      onClick={() =>
                        append({
                          productId: undefined,
                          quantity: 1,
                          price: undefined,
                        })
                      }
                      className="bg-primary text-white w-12 h-12"
                    >
                      +
                    </Button>
                    <Button
                      onClick={() => remove(index)}
                      className="flex items-center justify-center w-12 h-12"
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-x-4 mt-5 gap-x-4">
              <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
                Payable
              </p>
              <FormInput
                Label=""
                placeholder="Enter Mobile Number"
                classInput="text-[16px] font-bold text-supporting_gray  w-100 flex-shrink-0 h-12"
                classError="text-red-500"
                name="amount"
                type="amount"
                errors={errors}
                control={control}
                disabled
              />
            </div>
            <div className="flex items-center gap-x-4 mt-5 gap-x-4">
              <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
                Discount
              </p>
              <FormInput
                Label=""
                placeholder="Enter Discount"
                classInput="text-[16px] font-bold text-supporting_gray  w-100 flex-shrink-0 h-12"
                classError="text-red-500"
                name="discount"
                type="discount"
                errors={errors}
                control={control}
              />
            </div>
            <div className="flex items-center gap-x-4 mt-5 gap-x-4">
              <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
                Total Payable
              </p>
              <FormInput
                Label=""
                placeholder="Enter Mobile Number"
                classInput="text-[16px] font-bold text-supporting_gray  w-100 flex-shrink-0 h-12"
                classError="text-red-500"
                name="Payable"
                type="Payable"
                errors={errors}
                control={control}
                disabled
              />
            </div>
            <div className="flex items-center gap-x-4 mt-5 gap-x-4">
              <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
                Payment Method
              </p>
              <FormSelect
                Label=""
                placeholder="Select Payment Method"
                className="text-[16px] font-bold text-supporting_gray flex-shrink-0 h-12"
                labelClass="text-[16px] font-bold color-light"
                options={[
                  { label: "Cash", value: "Cash" },
                  { label: "IBFT", value: "IBFT" },
                  { label: "Cheque", value: "Cheque" },
                  { label: "Pay Order", value: "PayOrder" },
                  { label: "Credit Card", value: "CreditCard" },
                  { label: "Mobile Wallet", value: "MobileWallet" },
                ]}
                name="paymentTypeId"
                type="paymentTypeId"
                errors={errors}
                control={control}
              />
            </div>
            {instrumentOpen ? (
              <div className="flex items-center gap-x-4 mt-5 gap-x-4">
                <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
                  Instrument Number
                </p>
                <FormInput
                  Label=""
                  placeholder="Enter Instrument No"
                  classInput="text-[16px] font-bold text-supporting_gray  w-100 flex-shrink-0 h-12"
                  classError="text-red-500"
                  name="InstrumentNo"
                  type="InstrumentNo"
                  errors={errors}
                  control={control}
                />
              </div>
            ) : (
              ""
            )}

            <div className="flex items-center gap-x-4 mt-5 gap-x-4">
              <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
                Paid Amount
              </p>
              <FormInput
                Label=""
                placeholder="Enter paid amount."
                classInput="text-[16px] font-bold text-supporting_gray  w-100 flex-shrink-0 h-12"
                classError="text-red-500"
                name="paidAmount"
                type="paidAmount"
                errors={errors}
                control={control}
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex mt-5 ml-4 items-center gap-6 bg-supporting_blue rounded-[10px] py-3 px-4 cursor-pointer"
          >
            <img src={saveIcon} alt="save-Icon" />
            <span className="text-[16px] text-white">Save</span>
          </button>
        </form>
      ) : (
        <div>
          <LayoutHeader
            titleName={"Services"}
            onAddNew={() => setShowForm(true)}
            onChange={(e) => handleSearch(e.target.value)}
            value={searchQuery}
          />
          <Table
            className="custom-table"
            loading={services_Red.loading || searchQuery}
            columns={allColumns}
            dataSource={services_Red?.data?.data?.data}
            pagination={false}
            // rowKey="serviceDate"
            size="small"
            bordered={true}
            scroll={{ x: true }}
          />

          <div className="mt-6 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
            <div className="text-gray-500">
              Showing {currentPage * pageSize} to{" "}
              {Math.min(currentPage * pageSize, totalRecords)} of {totalRecords}{" "}
              entries
            </div>

            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalRecords}
              onChange={(page, size) => {
                setCurrentPage(page);
                setPageSize(size || 40);
              }}
              itemRender={(current, type, originalElement) => {
                if (type === "prev")
                  return (
                    <Button
                      icon={<MdOutlineKeyboardArrowLeft />}
                      className="flex items-center"
                    />
                  );
                if (type === "next")
                  return (
                    <Button
                      icon={<MdKeyboardArrowRight />}
                      className="flex items-center"
                    />
                  );
                if (type === "page")
                  return <Button className="mx-1">{current}</Button>;
                return originalElement;
              }}
              showSizeChanger
              pageSizeOptions={["40", "50", "60", "70"]}
              defaultPageSize={40}
              className="space-x-2"
            />
          </div>
        </div>
      )}
    </Layout>
  );
};
function mapStateToProps(state: any) {
  return {
    services_Red: state.services_Red,
  };
}

export default connect(mapStateToProps, Action)(ServicesPage);
