/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "../constant/Layout";
import { message, Modal } from "antd";
import { useState, useEffect } from "react";
import arrowIcon from "../assets/images/arrow-icon.svg";
import saveIcon from "../assets/images/save-btn.svg";
import * as Action from "../store/slice/services/index";
import * as report_actions from "../store/slice/customerLedger/index"
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormSelect } from "../components/basic";
import logo2 from "../assets/images/sidebar-logo.svg";

interface Service {
  services_Red: any;
  customerledger_Red:any;
  getCustomer: (customer: any) => unknown;
  getCustomerReport:(formData:any) => unknown;
}

interface ServiceFormValues {
  customerId:number;
  companyId:number;
  fromDate:string;
  toDate:string;
}

const validationSchema = yup.object().shape({
  customerId: yup.number().required("Customer ID is required"),
  companyId:yup.number().required("Company id Required"),
  fromDate:yup.string().required("From Date is Required"),
  toDate:yup.string().required("To Date is Required"),
});

const CustomerLedger : React.FC<Service> = ({
  services_Red,
  customerledger_Red,
  getCustomer,
  getCustomerReport
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [search, setSearch] = useState("");
  const [customerOptions, setCustomerOptions] = useState<any[]>([]);
  const [isCustomerLoading, setIsCustomerLoading] = useState(false);

  
  

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset
  } = useForm<ServiceFormValues>({
    defaultValues: {
      customerId: undefined,
      companyId:undefined,
      fromDate:undefined,
      toDate:undefined
    },
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const data = customerledger_Red.data.data

  const printReceipt = () => {
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.left = "-9999px";
    document.body.appendChild(iframe);
    
    const content = `
      <html>
        <head>
          <title>Customer Ledger</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            .bold { font-weight: bold; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size:10px }
            .total-row { background-color: #f5f5f5; }
            .Summary{
              display:flex;
              flex-direction:row;
              justify-content:space-between;
            }
            .summaryData{
              font-size:12px
            }  
            @media print {
              @page { size: A5; margin: 0; }
              body { width: 148mm; min-height: 210mm; }
              #receipt-container { visibility: visible; margin: 0; padding: 2mm; }
            }
          </style>
        </head>
        <body>
          <div id="receipt-container">
            <div class="header">
              <img src=${logo2} alt="Company Logo" style="max-width: 150px; margin-bottom: 10px;" />
              <h2>Customer Ledger Report</h2>
            </div>
            <div class="Summary">
               <span>
                 <p class="summaryData">Customer ID : ${data.summary.customerId}</p>
                 <p class="summaryData">Customer Name : ${data.summary.customerName}</p>
               </span>
               <span>
                <p class="summaryData">Opening Balance : ${data.summary.openingBalance}</p>
                <p class="summaryData">Closing Balance : ${data.summary.closingBalance}</p>
                <p class="summaryData">Total Credit : ${data.summary.totalCredit}</p>
                <p class="summaryData">Total Debit : ${data.summary.totalDebit}</p>
               </span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Remarks</th>
                  <th>Transaction Type</th>
                  <th>Debit</th>
                  <th>Credit</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                ${data?.transactions?.map((transaction:any) => `
                  <tr>
                    <td>${transaction.transactionDate}</td>
                    <td>${transaction.remarks}</td>
                    <td>${transaction.transactionType}</td>
                    <td>${transaction.debit}</td>
                    <td>${transaction.credit}</td>
                    <td>${transaction.balance}</td>
                  </tr>
                `).join('')}

              </tbody>
            </table>
            <div class="footer" style="margin-top: 20px; ">
              <p style="font-size:12px">Generated on: ${new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </body>
      </html>
    `;
  
    iframe.contentDocument?.write(content);
    iframe.contentDocument?.close();
  
    iframe.contentWindow?.addEventListener("afterprint", () => {
      document.body.removeChild(iframe);
    });
  
    iframe.contentWindow?.print();
  };

  

  const submitCustomer = async (data: ServiceFormValues) => {
    try {
      const formData = {
        customerId: data.customerId,
        companyId: data.companyId,
        fromDate: data.fromDate,
        toDate: data.toDate
      };

      const res: any = await getCustomerReport(formData);
      
      if (res?.error) {
        throw new Error(res.error.message || "Failed to fetch report");
      }

      if (res?.code === 200) {
        message.success("Report generated successfully!");
        printReceipt();
      } else {
        throw new Error(res?.message || "Unknown error occurred");
      }
    } catch (error: any) {
      message.error(error.message || "Failed to get report. Please try again.");
    } finally {
      reset();
    }
  };





  useEffect(() => {
    getCustomer({
      pageNumber: currentPage || 1,
      pageSize: pageSize,
      search: search,
    });
   
  }, [currentPage, pageSize, search]);

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

  useEffect(() => {
    setIsCustomerLoading(services_Red.loading);
  }, [services_Red.loading]);


  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handlePopupScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target) {
      const scrollTop = target.scrollTop;
      const scrollHeight = target.scrollHeight;
      const clientHeight = target.clientHeight;
      const isNearBottom = scrollHeight - (scrollTop + clientHeight) <= 10;

      if (isNearBottom) {
        const total = services_Red.cusData?.data?.totalCount || 0;
        const totalPages = Math.ceil(total / pageSize);
        if (currentPage < totalPages) {
          setCurrentPage((prev) => prev + 1);
        }
      }
      if (isNearBottom) {
        const productTotal  = services_Red.proData?.data?.totalCount || 0;
        const productTotalPages  = Math.ceil(productTotal / pageSize);
        if (currentPage < productTotalPages) {
          setCurrentPage((prev) => prev + 1);
        }
      }
    }
  };


  return (
    <Layout>
        <form action="" onSubmit={handleSubmit(submitCustomer)}>
          <div className="p-2">
            <div className="flex items-center justify-between">
              <p className="text-[24px] text-supporting_gray border-l border-[#000000] pl-4">
                Sales Report
              </p>
              <div className="flex items-center gap-4">
                <button
                  className="flex items-center gap-4 bg-primary rounded-[10px] p-4 cursor-pointer py-3 px-4"
                >
                  <img src={arrowIcon} alt="arrowIcon-Icon" />
                  <span className="text-[16px] text-white">Back</span>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-x-4 mt-5 gap-x-4">
              <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
                Company
              </p>
              <FormSelect
                Label=""
                placeholder="Campany"
                name="companyId"
                className="text-[16px] font-bold text-supporting_gray w-100 flex-shrink-0 h-12"
                labelClass="text-[16px] font-bold color-light"
                options={[
                  {
                    label:"one start",
                    value:"1"
                  }
                ]}
                errors={errors}
                control={control}
              />
            </div>
            <div className="flex items-center gap-x-4 mt-5 gap-x-4">
              <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
                Customer
              </p>
              <FormSelect
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
                from Date
              </p>
              <FormInput
                Label=""
                placeholder="From Date"
                name="fromDate"
                type="Date"
                classInput="text-[16px] font-bold text-supporting_gray w-100 flex-shrink-0 h-12"
                labelClass="text-[16px] font-bold color-light"
                errors={errors}
                control={control}
              />
            </div>
            <div className="flex items-center gap-x-4 mt-5 gap-x-4">
              <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
                To Date
              </p>
              <FormInput
                Label=""
                placeholder="To Date"
                name="toDate"
                type="Date"
                classInput="text-[16px] font-bold text-supporting_gray w-100 flex-shrink-0 h-12"
                labelClass="text-[16px] font-bold color-light"
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
            <span className="text-[16px] text-white">Get Report</span>
          </button>
        </form>
       

          
      
    </Layout>
  );
};

const mapDispatchToProps = {
  ...Action,
  ...report_actions,
};
 
function mapStateToProps(state: any) {
  return {
    services_Red: state.services_Red,
    customerledger_Red:state.customerledger_Red
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerLedger);
