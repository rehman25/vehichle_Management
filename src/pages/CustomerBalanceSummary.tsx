/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "../constant/Layout";
import { message, Modal } from "antd";
import { useState, useEffect } from "react";
import arrowIcon from "../assets/images/arrow-icon.svg";
import saveIcon from "../assets/images/save-btn.svg";
import * as report_actions from "../store/slice/customerBalanceSummary/index"
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormSelect } from "../components/basic";
import logo2 from "../assets/images/sidebar-logo.svg";
import customerledger_Red from "../store/reducer/customerledger";

interface Service {
  costumerBalance_Red:any;
  getCustomerBalanceReport:(formData:any) => unknown;
}

interface ServiceFormValues {
  companyId:number;
  fromDate:string;
  toDate:string;
}

const validationSchema = yup.object().shape({
  companyId:yup.number().required("Company id Required"),
  fromDate:yup.string().required("From Date is Required"),
  toDate:yup.string().required("To Date is Required"),
});

const CustomerBalanceSummary : React.FC<Service> = ({
  costumerBalance_Red,
  getCustomerBalanceReport
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);


  
  

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset
  } = useForm<ServiceFormValues>({
    defaultValues: {
      companyId:undefined,
      fromDate:undefined,
      toDate:undefined
    },
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  console.log(costumerBalance_Red);
  const data = costumerBalance_Red.data.data

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
              <h2>Customer Balance Summary</h2>
            </div>
            
            <table>
              <thead>
                <tr>
                  <th>Customer Id</th>
                  <th>Customer Name</th>
                  <th>Last Payment Date</th>
                  <th>Mobile Number</th>
                  <th>Net Balance</th>
                  <th>Total Invoiced</th>
                  <th>Total Paid</th>
                </tr>
              </thead>
              <tbody>
                ${data?.data?.map((transaction:any) => `
                  <tr>
                    <td>${transaction.customerId}</td>
                    <td>${transaction.customerName}</td>
                    <td>${transaction.transactionType}</td>
                    <td>${transaction.mobileNumber}</td>
                    <td>${transaction.netBalance}</td>
                    <td>${transaction.totalInvoiced}</td>
                    <td>${transaction.totalPaid}</td>
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
        companyId: data.companyId,
        fromDate: data.fromDate,
        toDate: data.toDate,
        pageNumber:currentPage,
        pageSize:pageSize
      };

      const res: any = await getCustomerBalanceReport(formData);
      
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




  return (
    <Layout>
        <form action="" onSubmit={handleSubmit(submitCustomer)}>
          <div className="p-2">
            <div className="flex items-center justify-between">
              <p className="text-[24px] text-supporting_gray border-l border-[#000000] pl-4">
                Customer Balance Summary
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

 
function mapStateToProps(state: any) {
  return {
    costumerBalance_Red : state.costumerBalance_Red
  };
}

export default connect(mapStateToProps, report_actions)(CustomerBalanceSummary);
