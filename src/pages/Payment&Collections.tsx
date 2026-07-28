/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "../constant/Layout";
import { message, Modal } from "antd";
import { useState, useEffect } from "react";
import saveIcon from "../assets/images/save-btn.svg";
import * as Action from "../store/slice/services/index";
import * as actionsPy from "../store/slice/payment&collection/index";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormSelect, FormTextArea } from "../components/basic";
import { debounce }  from 'lodash'

interface Service { 
  getSERVICES: (Pagination: any) => unknown;
  services_Red: any;
  payment_red: any;
  addPayment: (formData: any) => unknown;
  getCustomer: (customer: any) => unknown;
  getVehicleByID: (id: number) => unknown;
  getProduct: (customer: any) => unknown;
  getPrint: (customer: any) => unknown;
  getInvoices:(cusId:any) => unknown;
}

interface ServiceFormValues {
  customerId?: number;
  company?: number;
  InstrumentNo?: string;
  Amount: number;
  reEnterAmount: number;
  description: string;
  paymentTypeId:number;
  invoices?: string;
  TransactionCategory: number;
  TransactionType: number;
  vendor?: number;
  employee?: number;
}

interface ApiResponse {
  data: {
    customerId: string;
    serviceDate: string;
    mileage: number;
    dueMileage: number;
    vehicleId: number;
    InstrumentNo: string;
    amount: number;
    paymentTypeId: string;

  };
}

const validationSchema = yup.object().shape({
  customerId: yup.number().optional(),
  company: yup.number().optional(),
  invoices: yup.string().optional(),
  InstrumentNo: yup.string().optional(),
  vendor: yup.number().optional(),
  employee: yup.number().optional(),
  Amount: yup.number().required("Enter a amount"),
  reEnterAmount: yup.number()
  .required("Re Enter a amount")
  .oneOf([yup.ref('Amount')], 'Amounts must match'),
  paymentTypeId: yup.number().required("Payment type is required"),
  description: yup.string().required("Enter a description"),
  TransactionCategory: yup.number().required("Transaction Category is Required*"),
  TransactionType: yup.number().required("Transaction Type is Required*"),



});

const ServicesPage: React.FC<Service> = ({
  getSERVICES,
  services_Red,
  payment_red,
  addPayment,
  getCustomer,
  getVehicleByID,
  getInvoices,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [customerOptions, setCustomerOptions] = useState<any[]>([]);
  const [company, setCompany] = useState<any[]>([])
  const [isCustomerLoading, setIsCustomerLoading] = useState(false);
  const [instrumentOpen, setInstrumentNo] = useState(false);
  const [invoiceOptions, setInvoiceOptions] = useState<any[]>([]);
const [isInvoiceLoading, setIsInvoiceLoading] = useState(false);
const [transCat, setTransCat] = useState('')

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
      company: undefined, 
      InstrumentNo: undefined,
      Amount: undefined,
      reEnterAmount: undefined,
      invoices: '', 
      paymentTypeId: undefined,
      description: '',
      TransactionCategory: undefined,
      TransactionType: undefined,
      vendor: undefined, 
      employee: undefined, 
    },
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const submitCustomer = (data: ServiceFormValues) => {
    Modal.confirm({
      title: "Confirm Payment",
      content: "Are you sure you want to add this Payment?",
      okText: "Confirm",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const formData = {
            customerId: data.customerId ? data.customerId : null,
            companyId:data.company,
            invoiceId:data.invoices ? data.invoices : null,
            transactionAmount: data.Amount,
            InstrumentNo: data.InstrumentNo ? data.InstrumentNo : null,
            paymentMethodId: data.paymentTypeId,
            remarks:data.description,
            transactionCategoryId:data.TransactionCategory,
            TransactionTypeId:data.TransactionType,
            vendorId:data.vendor ? data.vendor : null ,
            employeeId:data.employee ? data.employee : null
          };
          console.log(formData);
          const res: any = await addPayment(formData);
          if (res.code === 200) {
            message.success("Payment added successfully!");
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
 
const cusID = watch("customerId")

  useEffect(() => {
    if (cusID) {
      getInvoices(cusID);
    }
  }, [cusID]);


  useEffect(() => {
    if (payment_red?.invoiceData) {
      const newOptions = payment_red?.invoiceData?.data?.map((item: any) => ({
        label: item.invoiceNo, 
        value: item.invoiceNo,
      })) || []; 
  
      setInvoiceOptions(newOptions);
    }
  }, [payment_red.invoiceData]);
  


  useEffect(() => {
    setIsInvoiceLoading(payment_red.loading);
  }, [payment_red.loading]);


  useEffect(() => {
    getCustomer({
      pageNumber: currentPage,
      pageSize: pageSize,
      search: searchTerm, 
    });
  }, [currentPage, pageSize, searchTerm]);


  useEffect(() => {
    if (services_Red.cusData?.data?.data) {
      console.log(services_Red.cusData?.data?.data);
      const newOptions = services_Red.cusData.data.data.map((item: any) => ({
        label: item.displayText, // Use displayText directly from API
        value: item.id,
      }));
      setCustomerOptions((prev) => [...prev, ...newOptions]);
      // if (currentPage === 1) {
      //   setCustomerOptions(newOptions);
      // } else {
      // }
    }
  }, [services_Red.cusData]);

  useEffect(() => {
    setIsCustomerLoading(services_Red.loading);
  }, [services_Red.loading]);

  const customerId = watch("customerId");

  useEffect(() => {
    if (customerId) {
      getVehicleByID(customerId);
    }
  }, [customerId]);

  const debouncedSearch = debounce((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page on new search
    setCustomerOptions([]); // Clear existing options
  }, 500);

  const handleSearch = (value: string) => {
     
    setSearch(value);
    debouncedSearch(value);
  };

  const handlePopupScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const nearBottom = target.scrollHeight - (target.scrollTop + target.clientHeight) <= 10;
  
    if (nearBottom) {
      const total = services_Red.cusData?.data?.totalCount || 0;
      const totalPages = Math.ceil(total / pageSize);
      if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    const subscription = watch((value) => {
      setInstrumentNo(value.paymentTypeId != 1);
    });
    return () => subscription.unsubscribe();
  }, [watch, instrumentOpen]);


  const transactionCategory = watch("TransactionCategory");


  useEffect(() => {
    if(transactionCategory == 1){
      setTransCat('1')
    }else if(transactionCategory == 2){
      setTransCat('2')
    }else if(transactionCategory == 3){
      setTransCat('3')
    }else{
      setTransCat('')
    }
  }, [transactionCategory]);






  return (
    <Layout>
      <form action="" onSubmit={handleSubmit(submitCustomer)}>
        <div className="p-2">
          <div className="flex items-center justify-between">
            <p className="text-[24px] text-supporting_gray border-l border-[#000000] pl-4">
              Payment & Collections
            </p>
          </div>

          <div className="flex items-center gap-x-4 mt-5 gap-x-4">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Company
            </p>
            <FormSelect
              Label=""
              placeholder="Select a Company"
              name="company"
              className="text-[16px] font-bold text-supporting_gray w-100 flex-shrink-0 h-12"
              labelClass="text-[16px] font-bold color-light"
              options={[
                {
                  label:"one star",
                  value:"1"
                }
              ]}
              errors={errors}
              control={control}
            />
          </div>
          <div className="flex items-center gap-x-4 mt-5 gap-x-4">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Transaction Category
            </p>
            <FormSelect
              Label=""
              placeholder="Select a Transaction Category"
              name="TransactionCategory"
              className="text-[16px] font-bold text-supporting_gray w-100 flex-shrink-0 h-12"
              labelClass="text-[16px] font-bold color-light"
              options={[
                {
                  label:"Customer Payment",
                  value:"1"
                },
                {
                  label:"Vendor Payment",
                  value:"2"
                },
                {
                  label:"Salary Payment",
                  value:"3"
                },
                {
                  label:"Petty Cash",
                  value:"4"
                },
                {
                  label:"Operational Cost",
                  value:"5"
                }
              ]}
              errors={errors}
              control={control}
            />
          </div>
          <div className="flex items-center gap-x-4 mt-5 gap-x-4">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Transaction Type
            </p>
            <FormSelect
              Label=""
              placeholder="Select a Transaction Type"
              name="TransactionType"
              className="text-[16px] font-bold text-supporting_gray w-100 flex-shrink-0 h-12"
              labelClass="text-[16px] font-bold color-light"
              options={[
                {
                  label:"Standard Payment",
                  value:"1"
                },
                {
                  label:"Refund",
                  value:"2"
                },
                {
                  label:"Reversal",
                  value:"3"
                },
                {
                  label:"Adjustment Positive",
                  value:"4"
                },
                {
                  label:"Adjustment Negative",
                  value:"5"
                },
                {
                  label:"Advance Payment",
                  value:"6"
                },
                

              ]}
              errors={errors}
              control={control}
            />
          </div>

          {transCat == '1' &&(
          <div className="flex items-center gap-x-4 mt-5 gap-x-4">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Customer
            </p>
            <FormSelect
              Label=""
              placeholder="Select a Customer"
              name="customerId"
              className="text-[16px] font-bold text-supporting_gray w-100 flex-shrink-0 h-12"
              labelClass="text-[16px] font-bold color-light"
              options={customerOptions}
              onSearch={handleSearch}
              onPopupScroll={handlePopupScroll}
              filterOption={false}
              showSearch
              searchValue={search}
              loading={isCustomerLoading}
              onChange={(value: any) => setValue("customerId", value)}
              errors={errors}
              control={control}
            />
          </div>
          )}
          {transCat == '2' &&(
          <div className="flex items-center gap-x-4 mt-5 gap-x-4">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Vendor
            </p>
            <FormSelect
              Label=""
              placeholder="Select a Vendor"
              name="vendor"
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
          )}
          {transCat == '3' &&(
          <div className="flex items-center gap-x-4 mt-5 gap-x-4">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Employee
            </p>
            <FormSelect
              Label=""
              placeholder="Select a Employee"
              name="employee"
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
          )}


          <div className="flex items-center gap-x-4 mt-5 gap-x-4">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Invoices
            </p>
            <FormSelect
              Label=""
              placeholder="select a invoice"
              name="invoices"
              className="text-[16px] font-bold text-supporting_gray w-100 flex-shrink-0 h-12"
              labelClass="text-[16px] font-bold color-light"
              options={invoiceOptions}
              onSearch={handleSearch}
              onPopupScroll={handlePopupScroll}
              filterOption={false}
              showSearch
              loading={isInvoiceLoading}
              onChange={(value: any) => setValue("invoices", value)}
              errors={errors}
              control={control}
            />
          </div>

          <div className="flex items-center gap-x-4 mt-5 gap-x-4">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Remaining Amount
            </p>
            <FormInput
              Label=""
              placeholder="0"
              classInput="text-[16px] font-bold text-supporting_gray  w-100 flex-shrink-0 h-12"
              classError="text-red-500"
              name=""
              type=""
              errors={errors}
              control={control}
              disabled
            />
          </div>
          <div className="flex items-center gap-x-4 mt-5 gap-x-4">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Enter Amount
            </p>
            <FormInput
              Label=""
              placeholder="Enter Amount"
              classInput="text-[16px] font-bold text-supporting_gray  w-100 flex-shrink-0 h-12"
              classError="text-red-500"
              name="Amount"
              type="Amount"
              errors={errors}
              control={control}
            />
          </div>
          <div className="flex items-center gap-x-4 mt-5 gap-x-4">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Re Enter Amount
            </p>
            <FormInput
              Label=""
              placeholder="Re Enter Amount"
              classInput="text-[16px] font-bold text-supporting_gray  w-100 flex-shrink-0 h-12"
              classError="text-red-500"
              name="reEnterAmount"
              type="reEnterAmount"
              errors={errors}
              control={control}
            />
          </div>
          <div className="flex items-center gap-x-4 mt-5 gap-x-4">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Payment Type
            </p>
            <FormSelect
              Label=""
              placeholder="Payment Type"
              classInput="text-[16px] font-bold text-supporting_gray  w-100 flex-shrink-0 h-15"
              classError="text-red-500"
              className="h-12"
              options={[
                { label: "Cash", value: "1" },
                { label: "IBFT", value: "2" },
                { label: "Cheque", value: "3" },
                { label: "Pay Order", value: "4" },
                { label: "Credit Card", value: "5" },
                { label: "Mobile Wallet", value: "6" },
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

          <div className=" gap-x-4 mt-5 gap-x-4 flex ">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Descriptions
            </p>
            <FormTextArea
              Label=""
              placeholder="Enter a Descriptions"
              name="description"
              type="description"
              classTextArea="text-[16px]  text-supporting_gray   flex-shrink-0 h-12  text-[16px]  color-light border p-1"
              className=""
              errors={errors}
              control={control}
              autoFocus
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
    </Layout>
  );
};

const mapDispatchToProps = {
  ...Action,
  ...actionsPy,
};
function mapStateToProps(state: any) {
  return {
    services_Red: state.services_Red,
    payment_red: state.payment_red,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicesPage);
