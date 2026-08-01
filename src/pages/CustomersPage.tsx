/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "../constant/Layout";
import LayoutHeader from "../components/LayoutHeader";
import { Table, Pagination, Button, Space, message, Modal } from 'antd';
import { useRef, useState, useEffect } from "react";
import arrowIcon from "../assets/images/arrow-icon.svg";
import saveIcon from "../assets/images/save-btn.svg";
import addIcon from "../assets/images/add-icon.svg";
import * as Action from '../store/slice/customer/index'
import { connect } from "react-redux";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormCheckBox, FormInput } from "../components/basic";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";






interface Customer {
  getCustomer: (Pagination: any) => unknown;
  getCustomerById:(id : any) => unknown; 
  DeleteCustomer:(id:any) => unknown;
  customer_Red: any,
  AddCustomer: (formData: any) => unknown;
  updateCustomer:(formDataUpdate:any) => unknown

}

interface DataSource {
  due_date: string;
  id: string;
  name: string;
  date: string;
  salary: string;
  bonus: string;
  total: string;
  car: string;
  customer: string;
  car_model: string;
  payment_method: string;
  remaining: string;
  payment_due_date: string;
  paid: string;
  discount: string;

}

interface FormDataTypes {
  name:string;
  mobileNumber: string;

}

interface FormValues {
  name:string;
  mobileNumber: string;
}

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  mobileNumber: yup
  .string()
  .matches(/^\d+$/, 'Mobile Number must be numeric')
  .required('Mobile Number is required'),
});
const CustomersPage: React.FC<Customer> = ({ getCustomer, customer_Red, AddCustomer , getCustomerById, updateCustomer,DeleteCustomer }) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [tableData, setTableData] = useState<DataSource[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredData, setFilteredData] = useState<DataSource[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentCustomerId, setCurrentCustomerId] = useState<string | null>(null);
  






  const allColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Customer ID',
      dataIndex: 'id',
      key: 'id',

    },
    {
      title: 'Mobile Number',
      dataIndex: `${'mobileNumber'}`,
      key: 'mobileNumber',
      fixed: 'right' as const,
      // with: 50,  
    },
    {
      title: 'Actions',
      dataIndex: 'Actions',
      key: 'Actions',
      fixed: 'right' as const,
      with: 150,

      render: (_: any, record: any) => (
        <Space size="middle">
          <FaRegEdit color='blue' size={24}  onClick={() => handleEditCustomer(record.id)}  style={{cursor:"pointer"}} />
          <MdDeleteForever color="red" size={24}  style={{cursor:"pointer"}} onClick={() => handleDeleteCustomer(record.id)}  />   
        </Space>
      ),
    }
  ];


  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue, getValues,watch,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      mobileNumber: '',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });



  useEffect(() => {
    setLoadingText(true)
    setTimeout(() => {
      setLoadingText(false)
    }, 2000)
  }, [])

const handleDeleteCustomer = async (id: string) => {
  Modal.confirm({
    title: 'Confirm Deletion',
    content: 'Are you sure you want to delete this customer?',
    okText: 'Delete',
    okType: 'danger',
    cancelText: 'Cancel',
    onOk: async () => {
      try {
        setLoadingText(true);
        const res: any = await DeleteCustomer(id);
        
        if (res?.code === 200) {
          message.success('Customer deleted successfully!');
          getCustomer({
            pageNumber: currentPage,
            pageSizes: pageSize,
          });
        } else {
          message.error(res?.message || 'Failed to delete customer');
        }
      } catch (error) {
        console.error('Error deleting customer:', error);
        message.error('Failed to delete customer. Please try again.');
      } finally {
        setLoadingText(false);
      }
    }
  });
};

  const handleEditCustomer = async (id: string) => {
    try {
      const response: any = await getCustomerById(id);
      if (response.data) {
        const customer = response.data;
        console.log(customer, 'cua');
        setValue('name', customer.name);
        setValue('mobileNumber', customer.mobileNumber);
        setCurrentCustomerId(customer.id);
        setIsEditing(true);
        setShowForm(true);
      }
    } catch (error) {
      console.error('Error fetching customer:', error);
      message.error('Failed to load customer data');
    }
  };


  const submitCustomer = async (data: FormValues) => {
     const formDataUpdate = {
      id:currentCustomerId,
      name: data.name,      
      mobileNumber: data.mobileNumber,
    };
    try {
      if (isEditing && currentCustomerId) {
        const res: any = await updateCustomer(formDataUpdate);

        if (res.code === 200) {
          message.success('Customer updated successfully!');
          getCustomer({
            pageNumber: currentPage,
            pageSizes: pageSize,
          });
          reset();
          setIsEditing(false);
          setCurrentCustomerId(null);
          setShowForm(false);
        } else {
          message.error(res.message);
        }
      } else {

         const formData = {
      name: data.name,
      mobileNumber: data.mobileNumber,
    };
        // Add new customer
        const res: any = await AddCustomer(formData);
        if (res.code === 200) {
          message.success('Customer added successfully!');
          getCustomer({
            pageNumber: currentPage,
            pageSizes: pageSize,
          });
          reset();
          setShowForm(false);
        } else {
          message.error(res.message);
        }
      }
    } catch (error) {
      console.log(error, 'Error');
      message.error(`Failed to ${isEditing ? 'update' : 'add'} customer. Please try again.`);
    }
  };

 
  useEffect(() => {
    getCustomer({
      pageNumber: currentPage,
      pageSizes: pageSize,
      SearchText:searchTerm
    });
  }, [currentPage, pageSize,searchTerm]);

  useEffect(() => {
    if (customer_Red?.data?.data) {
       const data = customer_Red?.data?.data?.data ?? [];
       console.log(data.isActive);
       if(data){
         setTableData(data);
         setTotalRecords(customer_Red?.data?.data?.totalCount ?? 0);
       const filtered = data.filter((item: any) =>
         Object.values(item).some(val =>
           String(val).toLowerCase().includes(searchTerm.toLowerCase())
         )
       );
       setFilteredData(filtered);
       }
    } else {
      setTableData([]);
      setTotalRecords(0);
      setFilteredData([]);
    }
  }, [customer_Red, searchTerm]);

  const filterGridData = (searchTerm: string) => {
    if (customer_Red?.data?.data) {
      const data = customer_Red.data.data.data;
      const filtered = data.filter((item: DataSource) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) 
      );
      setFilteredData(filtered);
    }
  };


  return (
    <Layout>
      {showForm ? (
          <form action="" onSubmit={handleSubmit(submitCustomer)} >
        <div className="p-2">

          <div className="flex items-center justify-between">
            <p className="text-[24px] text-supporting_gray border-l border-[#000000] pl-4">
              Add Customer
                          </p>
          </div>

          <div className="flex items-center gap-x-4 mt-5 gap-x-4">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Customer Name
            </p>
            <FormInput
              autoFocus
              Label=""
              placeholder="name"
              classInput="text-[16px] font-bold text-supporting_gray  w-100 flex-shrink-0 h-12"
              classError="text-red-500"
              name="name"
              type="name"
              errors={errors}
              control={control}
            />
          </div>
          <div className="flex items-center gap-x-4 mt-5 gap-x-4">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Mobile Number
            </p>
            <FormInput
              Label=""
              placeholder="Enter Mobile Number"
              classInput="text-[16px] font-bold text-supporting_gray  w-100 flex-shrink-0 h-12"
              classError="text-red-500"
              name="mobileNumber"
              type="mobileNumber"
              errors={errors}
              control={control}
            />
          </div>
         
        </div>
        <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
              <button
                onClick={() => setShowForm(false)}
                className="flex items-center gap-4 bg-primary rounded-[10px] p-4 cursor-pointer py-3 px-4"
              >
                <img src={arrowIcon} alt="arrowIcon-Icon" />
                <span className="text-[16px] text-white">Back</span>
              </button>
              <button type="submit" className="flex items-center gap-4 bg-supporting_blue rounded-[10px] py-3 px-4 cursor-pointer">
                <img src={saveIcon} alt="save-Icon" />
                <span className="text-[16px] text-white">Save</span>
              </button>
            </div>
          </div>
          </form>
      ) : (
        <div>
          <LayoutHeader
            titleName={"Customers"}
            onAddNew={() => setShowForm(true)}
            onChange={(e) => {setSearchTerm(e.target.value)
              filterGridData(e.target.value)}}
          />
          <Table
            className="custom-table"
            loading={customer_Red.loading}
            columns={allColumns}
            dataSource={filteredData}
            pagination={false}
            // rowKey="id"
            rowClassName="hover:bg-gray-50 transition-colors"
            bordered={false}
            scroll={{ x: true }}
          />

          <div className="mt-6 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
            <div className="text-gray-500">
              Showing {(currentPage) * pageSize + 1} to {Math.min(currentPage * pageSize, totalRecords)} of {totalRecords} entries
            </div>

            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalRecords}
              onChange={(page, size) => {
                setCurrentPage(page);
                setPageSize(size);
              }}
              itemRender={(current, type, originalElement) => {
                if (type === 'prev') return <Button icon={<MdOutlineKeyboardArrowLeft />} className="flex items-center" />;
                if (type === 'next') return <Button icon={<MdKeyboardArrowRight />} className="flex items-center" />;
                if (type === 'page') return <Button className="mx-1">{current}</Button>;
                return originalElement;
              }}
              showSizeChanger
              pageSizeOptions={['9', '15', '30', '50']}
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
    customer_Red: state.customer_Red,
  }

}

export default connect(mapStateToProps, Action)(CustomersPage);
