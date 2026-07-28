/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Layout from "../constant/Layout";
import { Table, Pagination, Button, Space, message, Spin } from "antd";
import saveIcon from "../assets/images/save-btn.svg";
import * as Action from "../store/slice/item/index";
import { connect } from "react-redux";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSelect, FormInput } from "../components/basic";

interface Customer {
  getItems: (Pagination: any) => unknown;
  Item_Red: any;
  AddItem: (formData: any) => unknown;
  getType: () => unknown;
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
  itemName: string;
  itemPrice: number;
  itemType: number;
  oilMileage: number;
  availableQuantity: number;
}

interface FormValues {
  itemName: string;
  itemPrice: number;
  itemType: number;
  oilMileage: number;
  availableQuantity: number;
}

const validationSchema = yup.object().shape({
  itemName: yup.string().required("Item Name is required"),
  itemPrice: yup.number().required("Item Price is required"),
  itemType: yup.number().required("Item Type is required"),
  oilMileage: yup.number().required("Oil Mileage is required"),
  availableQuantity: yup.number().required("available Quantity is required"),
});

const ItemsPage: React.FC<Customer> = ({
  getItems,
  Item_Red,
  getType,
  AddItem,
}) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [tableData, setTableData] = useState<DataSource[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [customerOptions, setCustomerOptions] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<DataSource[]>([]);
  const [isCustomerLoading, setIsCustomerLoading] = useState(false);
  const [isLoader, setLoader] = useState<boolean>(false);

  console.log(Item_Red);

  const allColumns = [
    {
      title: "Item Name",
      dataIndex: "displayText",
      key: "displayText",
    },
    {
      title: "Item Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `Rs ${price.toFixed(2)}`,
    },
    {
      title: "Item Type",
      dataIndex: "itemTypeName",
      key: "itemTypeName",
    },

    {
      title: "Available Quantity",
      dataIndex: `availableQuantity`,
      key: "availableQuantity",
    },
  ];

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      itemName: "",
      itemPrice: undefined,
      itemType: undefined,
      oilMileage: undefined,
      availableQuantity: undefined,
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

  const AddItems = async (data: FormValues) => {
    const formData = {
      name: data.itemName,
      price: data.itemPrice,
      itemTypeId: data.itemType,
      oilMileage: data.oilMileage,
      availableQuantity: data.availableQuantity,
    };

    try {
      setLoader(true);
      const res: any = await AddItem(formData);
      if (res?.code === 200) {
        message.success("Item added successfully!");
        await getItems({
          pageNumber: currentPage,
          pageSizes: pageSize,
          search: searchTerm,
        });
        reset({
          itemName: "",
          itemPrice: undefined,
          itemType: undefined,
          oilMileage: undefined,
          availableQuantity: undefined,
        });
        setShowForm(false);
      } else {
        message.error(res?.message || "Failed to add item");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      message.error("Failed to add item. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getType();
  }, []);

  useEffect(() => {
    getItems({
      pageNumber: currentPage || 1,
      pageSizes: pageSize,
      search: searchTerm,
    });
  }, [currentPage, pageSize, searchTerm]);

  useEffect(() => {
    if (Item_Red?.data?.data?.data) {
      const data = Array.isArray(Item_Red.data.data.data)
        ? Item_Red.data.data.data
        : [];
      setTableData(data);
      setTotalRecords(Item_Red.data.data.totalCount);
      console.log(Item_Red.data.data.data.totalCount, "dara");
    }
  }, [Item_Red, searchTerm]);

  useEffect(() => {
    if (Item_Red.dataType?.data) {
      const newOptions = Item_Red.dataType.data.map((item: any) => ({
        label: item.displayText,
        value: item.id,
      }));
      if (currentPage === 1) {
        setCustomerOptions(newOptions);
      } else {
        setCustomerOptions((prev) => [...prev, ...newOptions]);
      }
    }
  }, [Item_Red.dataType]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Reset to first page when searching
    setCurrentPage(1);
  };

  return (
    <Layout>
      <Spin fullscreen spinning={isLoader} />
      <form action="" onSubmit={handleSubmit(AddItems)}>
        <div className="p-2">
          <div className="flex items-center justify-between">
            <p className="text-[24px] text-supporting_gray border-l border-[#000000] pl-4">
              Add Item
            </p>
          </div>
          <div className="flex items-center gap-x-4 mt-5 gap-x-4">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Item Name
            </p>
            <FormInput
              Label=""
              placeholder="Enter Item Name"
              classInput="text-[16px] font-bold text-supporting_gray  w-100 flex-shrink-0 h-12"
              classError="text-red-500"
              name="itemName"
              type="itemName"
              errors={errors}
              control={control}
            />
          </div>
          <div className="flex items-center gap-x-4 mt-5 gap-x-4">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Item Price
            </p>
            <FormInput
              Label=""
              placeholder="Enter Item Price"
              classInput="text-[16px] font-bold text-supporting_gray  w-100 flex-shrink-0 h-12"
              classError="text-red-500"
              name="itemPrice"
              type="itemPrice"
              errors={errors}
              control={control}
            />
          </div>

          <div className="flex items-center gap-x-4 mt-5 gap-x-4">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Item Type
            </p>
            <FormSelect
              Label=""
              placeholder="Select Item Type"
              name="itemType"
              className="text-[16px] font-bold text-supporting_gray w-100 flex-shrink-0 h-12"
              labelClass="text-[16px] font-bold color-light"
              options={customerOptions}
              errors={errors}
              control={control}
            />
          </div>
          <div className="flex items-center gap-x-4 mt-5 gap-x-4">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Oil Mileage
            </p>
            <FormInput
              Label=""
              placeholder="Enter OilMileage"
              classInput="text-[16px] font-bold text-supporting_gray  w-100 flex-shrink-0 h-12"
              classError="text-red-500"
              name="oilMileage"
              type="oilMileage"
              errors={errors}
              control={control}
            />
          </div>
          <div className="flex items-center gap-x-4 mt-5 gap-x-4">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Available Quantity
            </p>
            <FormInput
              Label=""
              placeholder="Available Quantity"
              classInput="text-[16px] font-bold text-supporting_gray  w-100 flex-shrink-0 h-12"
              classError="text-red-500"
              name="availableQuantity"
              type="availableQuantity"
              errors={errors}
              control={control}
            />
          </div>
        </div>
        <button
          type="submit"
          className="flex items-center gap-4 bg-supporting_blue rounded-[10px] py-3 px-4 cursor-pointer my-3 float-right"
        >
          <img src={saveIcon} alt="save-Icon" />
          <span className="text-[16px] text-white">Save</span>
        </button>
      </form>
      <div className="mt-5">
        <div className="mb-4">
          <p>Search Item</p>
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 border rounded w-full max-w-md"
          />
        </div>
        <Table
          className="custom-table"
          loading={Item_Red.loading}
          columns={allColumns}
          dataSource={tableData}
          pagination={false}
          rowKey="id"
          rowClassName="hover:bg-gray-50 transition-colors"
          bordered={true}
          size="small"
          scroll={{ x: true }}
        />

        <div className="mt-6 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
          <div className="text-gray-500">
            Showing {currentPage * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, totalRecords)} of {totalRecords}{" "}
            entries
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
            pageSizeOptions={["9", "15", "30", "50"]}
            className="space-x-2"
          />
        </div>
      </div>
    </Layout>
  );
};
function mapStateToProps(state: any) {
  return {
    Item_Red: state.Item_Red,
  };
}

export default connect(mapStateToProps, Action)(ItemsPage);
