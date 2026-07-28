/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "../constant/Layout";
import { message, Modal, Spin } from "antd"; // Import Spin component
import { useState, useEffect } from "react";
import arrowIcon from "../assets/images/arrow-icon.svg";
import saveIcon from "../assets/images/save-btn.svg";
import * as Action from "../store/slice/services/index";
import * as Action_Transfer from "../store/slice/transfer/index";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, FormSelect, FormTextArea } from "../components/basic";

interface Service {
  services_Red: any;
  transfer_red: any;
  transferVehicle: (formData: any) => unknown;
  getCustomer: (customer: any) => unknown;
  getVehicleByID: (id: number) => unknown;
}

interface ServiceFormValues {
  fromCustomerId: number;
  customerVehicleId: number;
  vehicleId: number;
  toCustomerId: number;
  description: string;
}

const validationSchema = yup.object().shape({
  fromCustomerId: yup.number().required("Customer ID is required"),
  toCustomerId: yup.number().required("Customer ID is required"),
  customerVehicleId: yup.number().required("Vehicle ID is required"),
  vehicleId: yup.number().required("Vehicle ID is required"),
  description: yup.string().required("descriptions is required"),
});

const ServicesPage: React.FC<Service> = ({
  services_Red,
  transfer_red,
  getCustomer,
  getVehicleByID,
  transferVehicle,
}) => {
  const [loadingText, setLoadingText] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [search, setSearch] = useState("");
  const [customerOptions, setCustomerOptions] = useState<any[]>([]);
  const [vehicleOptions, setVehicleOptions] = useState<any[]>([]);
  const [isCustomerLoading, setIsCustomerLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // State for loading spinner

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
      fromCustomerId: undefined,
      customerVehicleId: undefined,
      vehicleId: 0,
      toCustomerId: undefined,
      description: undefined,
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

  const submitCustomer = async(data: ServiceFormValues) => {
    setIsSubmitting(true);
        try {
          const formData = {
            fromCustomerId: data.fromCustomerId,
            customerVehicleId: data.customerVehicleId,
            vehicleId: data.vehicleId,
            toCustomerId: data.toCustomerId,
            description: data.description,
          };
          const res: any = await transferVehicle(formData);

          if (res.code === 200) {
            setTimeout(() => {
                message.success("Service added successfully!");
              setIsSubmitting(false); 
              reset();
            }, 2000);
          } else {
            message.error(res.message);
           setIsSubmitting(false);
           
          }
        } catch (error) {
          message.error("Failed to add service. Please try again.");
    setIsSubmitting(false);

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

  const customerId = watch("fromCustomerId");

  useEffect(() => {
    if (customerId) {
      getVehicleByID(customerId);
    }
  }, [customerId]);

  useEffect(() => {
    if (services_Red.vehData?.data) {
      const vehicles = services_Red.vehData.data;
      const newOptions = services_Red.vehData.data.map((item: any) => ({
        label: item.vehicleNumber,
        value: item.id,
      }));

      if (vehicles.length === 1) {
        setValue("customerVehicleId", vehicles[0].id);
      } else {
        setVehicleOptions(newOptions);
      }
    }
  }, [services_Red.vehData]);

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
        const total = services_Red.proData?.data?.totalCount || 0;
        const totalPages = Math.ceil(total / pageSize);
        if (currentPage < totalPages) {
          setCurrentPage((prev) => prev + 1);
        }
      }
    }
  };

  return (
    <>
    <Spin spinning={isSubmitting} fullscreen /> 
    <Layout>
        <form action="" onSubmit={handleSubmit(submitCustomer)}>
          <div className="p-2">
            <div className="flex items-center justify-between">
              <p className="text-[24px] text-supporting_gray border-l border-[#000000] pl-4">
                Transfer Vehicle
              </p>
              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  className="flex items-center gap-4 bg-supporting_blue rounded-[10px] py-3 px-4 cursor-pointer"
                >
                  <img src={saveIcon} alt="save-Icon" />
                  <span className="text-[16px] text-white">Save</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-x-4 mt-5 gap-x-4">
              <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
                Customer Name
              </p>
              <FormSelect
                Label=""
                placeholder="Customer"
                name="fromCustomerId"
                className="text-[16px] font-bold text-supporting_gray w-100 flex-shrink-0 h-12"
                labelClass="text-[16px] font-bold color-light"
                options={customerOptions}
                onSearch={handleSearch}
                onPopupScroll={handlePopupScroll}
                filterOption={false}
                showSearch
                loading={isCustomerLoading}
                onChange={(value: any) => setValue("fromCustomerId", value)}
                errors={errors}
                control={control}
              />
            </div>
            <div className="flex items-center gap-x-4 mt-5 gap-x-4">
              <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
                Vehicle No
              </p>
              {vehicleOptions.length === 1 ? (
                <FormInput
                  Label=""
                  placeholder="Vehicle No"
                  classInput="text-[16px] font-bold text-supporting_gray w-100 flex-shrink-0 h-12"
                  classError="text-red-500"
                  name="customerVehicleId"
                  type="text"
                  errors={errors}
                  control={control}
                  disabled
                  autoFocus
                />
              ) : (
                <FormSelect
                  Label=""
                  placeholder="Select a vehcle"
                  name="customerVehicleId"
                  className="text-[16px] font-bold text-supporting_gray w-100 flex-shrink-0 h-12"
                  labelClass="text-[16px] font-bold color-light"
                  options={vehicleOptions}
                  filterOption={false}
                  showSearch
                  loading={isCustomerLoading}
                  onChange={(value: any) => setValue("customerVehicleId", value)}
                  errors={errors}
                  control={control}
                  autoFocus
                />
              )}
            </div>
            <div className="flex items-center justify-center my-5">
              <h6 className="text-lg font-semibold">Transfer To</h6>
            </div>
            <div className="flex items-center gap-x-4 mt-5 gap-x-4">
              <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
                Customer Id
              </p>
              <FormSelect
                Label=""
                placeholder="Customer"
                name="toCustomerId"
                className="text-[16px] font-bold text-supporting_gray w-100 flex-shrink-0 h-12"
                labelClass="text-[16px] font-bold color-light"
                options={customerOptions}
                onSearch={handleSearch}
                onPopupScroll={handlePopupScroll}
                filterOption={false}
                showSearch
                loading={isCustomerLoading}
                onChange={(value: any) => setValue("toCustomerId", value)}
                errors={errors}
                control={control}
              />
            </div>

            <div className=" gap-x-4 mt-5 gap-x-4">
              <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
                Descriptions
              </p>
                
                <FormTextArea
                  Label=""
                  placeholder="Enter a description"
                  name="description"
                  type="description"
                  className="text-[16px]  text-supporting_gray w-100 flex-shrink-0 h-12 "
                  classTextArea="text-[16px]  color-light border p-1"
                  errors={errors}
                  control={control}
                  autoFocus
                />
            </div>
          </div>
        </form>
      
    </Layout>
    </>
  );
};

const mapDispatchToProps = {
  ...Action,
  ...Action_Transfer,
};

function mapStateToProps(state: any) {
  return {
    services_Red: state.services_Red,
    transfer_red: state.transfer_red,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicesPage);